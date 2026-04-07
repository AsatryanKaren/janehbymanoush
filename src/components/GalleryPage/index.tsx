import { useState } from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { GalleryPageProps } from "./types";
import styles from "./styles.module.css";

const { Title, Paragraph, Text } = Typography;

const GalleryPage: React.FC<GalleryPageProps> = ({ images }) => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = images.map((src) => ({ src }));

  return (
    <div className={styles.root}>
      <header className={styles.intro}>
        <Text className={styles.kicker}>{t("gallery.kicker")}</Text>
        <div className={styles.accentBar} aria-hidden />
        <Title level={2} className={styles.title}>
          {t("gallery.title")}
        </Title>
        <Paragraph className={styles.subtitle}>{t("gallery.intro")}</Paragraph>
      </header>

      <section
        className={styles.grid}
        aria-label={t("gallery.title")}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={styles.tile}
            onClick={() => {
              setIndex(i);
              setLightboxOpen(true);
            }}
            aria-label={t("gallery.viewImage", {
              current: i + 1,
              total: images.length,
            })}
          >
            <img
              src={src}
              alt=""
              className={styles.image}
              loading="lazy"
            />
          </button>
        ))}
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </div>
  );
};

export default GalleryPage;
