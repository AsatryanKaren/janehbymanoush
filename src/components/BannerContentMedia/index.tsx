import type { BannerContentMediaProps } from "./types";
import styles from "./styles.module.css";

const BannerContentMedia: React.FC<BannerContentMediaProps> = ({
  url,
  isVideo,
  posterUrl,
  showVideoControls = false,
  fit = "contain",
}) => {
  const src = encodeURI(url);
  const mediaClass = fit === "cover" ? styles.mediaCover : styles.mediaContain;

  if (isVideo) {
    return (
      <div className={styles.root}>
        <video
          className={mediaClass}
          src={src}
          autoPlay={!showVideoControls}
          muted
          loop={!showVideoControls}
          playsInline
          controls={showVideoControls}
          poster={posterUrl ?? undefined}
        />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <img
        className={mediaClass}
        src={src}
        alt=""
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default BannerContentMedia;
