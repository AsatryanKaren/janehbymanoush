import { useCallback, useEffect, useRef, useState } from "react";
import { paymentsApi } from "src/api/payments.api";
import { isTerminalFailure } from "src/types/payments";

export type PaymentPollingPhase =
  | "idle"
  | "polling"
  | "success"
  | "failed"
  | "pendingTimeout"
  | "noPayment";

type UsePaymentStatusPollingOptions = {
  intervalMs?: number;
  timeoutMs?: number;
};

const DEFAULT_INTERVAL_MS = 10000;
const DEFAULT_TIMEOUT_MS = 180_000;

/**
 * Polls `GET /v1/payments/epg/status/{epgOrderId}` until terminal or timeout.
 * - Recursive `setTimeout` (not `setInterval`) so a slow request never stacks.
 * - Network errors are swallowed and retried; only the wall-clock timeout
 *   transitions to `pendingTimeout` (per backend doc § 4 polling guidance).
 * - `epgOrderId == null` shortcuts to `noPayment` so deep-links don't spin.
 */
export const usePaymentStatusPolling = (
  epgOrderId: string | null,
  options: UsePaymentStatusPollingOptions = {},
): { phase: PaymentPollingPhase; retry: () => void } => {
  const { intervalMs = DEFAULT_INTERVAL_MS, timeoutMs = DEFAULT_TIMEOUT_MS } =
    options;

  const [phase, setPhase] = useState<PaymentPollingPhase>(
    epgOrderId == null ? "noPayment" : "idle",
  );

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef<boolean>(false);
  const startedAtRef = useRef<number>(0);
  // Bumped by `retry()`; in-flight ticks compare against this and bail if stale.
  const runIdRef = useRef<number>(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const tick = useCallback(
    (id: string, runId: number) => {
      if (cancelledRef.current || runId !== runIdRef.current) return;

      paymentsApi
        .getStatus(id)
        .then((res) => {
          if (cancelledRef.current || runId !== runIdRef.current) return;
          if (res.isSuccessful) {
            setPhase("success");
            return;
          }
          if (isTerminalFailure(res.status)) {
            setPhase("failed");
            return;
          }
          if (Date.now() - startedAtRef.current >= timeoutMs) {
            setPhase("pendingTimeout");
            return;
          }
          timerRef.current = setTimeout(
            () => tick(id, runId),
            intervalMs,
          );
        })
        .catch(() => {
          if (cancelledRef.current || runId !== runIdRef.current) return;
          // Transient network errors: keep retrying until timeout flips us.
          if (Date.now() - startedAtRef.current >= timeoutMs) {
            setPhase("pendingTimeout");
            return;
          }
          timerRef.current = setTimeout(
            () => tick(id, runId),
            intervalMs,
          );
        });
    },
    [intervalMs, timeoutMs],
  );

  const startRun = useCallback(
    (id: string) => {
      clearTimer();
      runIdRef.current += 1;
      startedAtRef.current = Date.now();
      setPhase("polling");
      tick(id, runIdRef.current);
    },
    [clearTimer, tick],
  );

  useEffect(() => {
    cancelledRef.current = false;
    if (epgOrderId == null) {
      setPhase("noPayment");
      return () => {
        cancelledRef.current = true;
        clearTimer();
      };
    }

    startRun(epgOrderId);

    return () => {
      cancelledRef.current = true;
      clearTimer();
    };
  }, [epgOrderId, startRun, clearTimer]);

  const retry = useCallback(() => {
    if (epgOrderId == null) return;
    cancelledRef.current = false;
    startRun(epgOrderId);
  }, [epgOrderId, startRun]);

  return { phase, retry };
};
