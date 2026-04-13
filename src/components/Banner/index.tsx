import { useState, useEffect } from "react";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "src/consts/routes";
import { getBannerContent } from "src/api/bannerContent";
import type { BannerContent } from "src/types/banner";
import BannerContentMedia from "src/components/BannerContentMedia";
import { BANNER_VIDEO_ENABLED, BANNER_VIDEO_URL } from "./consts";
import heroImage from "./assets/newBanner.jpg";
import styles from "./styles.module.css";

const Banner: React.FC = () => {
  const { t } = useTranslation();
  const [heightPx, setHeightPx] = useState<number | null>(null);
  const [remote, setRemote] = useState<BannerContent | null>(null);
  const [remoteReady, setRemoteReady] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      const headerHeight = 72; /* matches layout header height */
      setHeightPx(window.innerHeight - headerHeight);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void getBannerContent()
      .then((res) => {
        if (cancelled) return;
        if (res?.url?.trim()) setRemote(res);
        else setRemote(null);
      })
      .catch(() => {
        if (!cancelled) setRemote(null);
      })
      .finally(() => {
        if (!cancelled) setRemoteReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const showRemote =
    remoteReady && remote !== null && remote.url.trim() !== "";
  /** After GET finishes: no API banner → same constant video as pre–admin-banner. */
  const showFallbackVideo =
    remoteReady && !showRemote && BANNER_VIDEO_ENABLED;

  return (
    <section
      className={styles.banner}
      style={{
        ...(heightPx !== null && { height: heightPx }),
        backgroundImage: `linear-gradient(rgba(28,25,23,0.15), rgba(28,25,23,0.2)), url(${heroImage})`,
      }}
    >
      <div className={styles.videoWrapper} aria-hidden>
        {showRemote ?
          <BannerContentMedia
            key={remote.url}
            url={remote.url}
            isVideo={remote.isVideo}
            posterUrl={heroImage}
            fit="cover"
          />
        : showFallbackVideo ?
          <BannerContentMedia
            key="fallback-banner-video"
            url={BANNER_VIDEO_URL}
            isVideo
            posterUrl={heroImage}
            fit="cover"
          />
        : <img
            src={heroImage}
            className={styles.fallbackImg}
            alt=""
            loading="eager"
            decoding="async"
          />
        }
      </div>
      <div className={styles.content}>
        {/* <p className={styles.tagline}>{t("home.tagline")}</p> */}
        <h1 className={styles.brand}>
          <span className={styles.brandLine1}>{t("home.brandLine1")}</span>
          <span className={styles.brandLine2}>{t("home.brandLine2")}</span>
        </h1>
        <Flex gap="middle" justify="center" className={styles.actions}>
          <Link to={ROUTES.NEW}>
            <Button type="primary" size="large" className={styles.btnPrimary}>
              {t("home.newCollection")}
            </Button>
          </Link>
          <Link to={ROUTES.CATALOG}>
            <Button size="large" className={styles.btnOutline}>
              {t("home.viewAll")}
            </Button>
          </Link>
        </Flex>
      </div>
    </section>
  );
};

export default Banner;
