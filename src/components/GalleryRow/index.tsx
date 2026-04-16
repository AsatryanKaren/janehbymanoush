import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getHomeGalleryStripUrls } from "src/consts/homeGalleryStrip";
import styles from "./styles.module.css";

const GalleryRow: React.FC = () => {
  const images = useMemo(() => getHomeGalleryStripUrls(), []);
  const slides = useMemo(() => images.map((src) => ({ src })), [images]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <section className={styles.section}>
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            className={styles.tile}
            onClick={() => {
              setIndex(i);
              setLightboxOpen(true);
            }}
            aria-label={`View image ${i + 1} of ${images.length}`}
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
    </>
  );
};

export default GalleryRow;
