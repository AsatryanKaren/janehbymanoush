/**
 * Builds HTTP query params from an object by dropping undefined and empty string values.
 * Use for GET list endpoints that accept optional filters.
 * Accepts any object (e.g. interfaces with optional string/number props) so callers need no cast.
 */
export const toQueryParams = <T extends object>(
  paramsObject: T | undefined,
): Record<string, string | number | undefined> | undefined => {
  if (paramsObject == null) return undefined;
  const entries = Object.entries(paramsObject).filter(
    ([, value]) => value !== undefined && value !== "",
  ) as [string, string | number][];
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};
