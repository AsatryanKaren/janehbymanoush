import styles from "./GalleryRow.module.css";

const IMAGES = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
];

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
