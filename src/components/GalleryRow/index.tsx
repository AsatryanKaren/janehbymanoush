import { IMAGES } from "./consts";
import styles from "./styles.module.css";

const GalleryRow: React.FC = () => {
  return (
    <section className={styles.section}>
      {IMAGES.map((src, i) => (
        <div key={i} className={styles.tile}>
          <img src={src} alt="" className={styles.image} />
        </div>
      ))}
    </section>
  );
};

export default GalleryRow;
