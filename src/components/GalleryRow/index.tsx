import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { IMAGES } from "./consts";
import styles from "./styles.module.css";

const slides = IMAGES.map((src) => ({ src }));

const GalleryRow: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className={styles.section}>
      {IMAGES.map((src, i) => (
        <button
          key={i}
          type="button"
          className={styles.tile}
          onClick={() => {
            setIndex(i);
            setLightboxOpen(true);
          }}
          aria-label={`View image ${i + 1} of ${IMAGES.length}`}
        >
          <img src={src} alt="" className={styles.image} />
        </button>
      ))}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </section>
  );
};

export default GalleryRow;
