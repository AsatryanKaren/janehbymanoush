import { useState, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { ProductImagesProps } from "./types";
import styles from "./styles.module.css";

const PLACEHOLDER = "/placeholder.jpg";

const ProductImages: React.FC<ProductImagesProps> = ({
  images,
  mainImageUrl,
  productName,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const imageList = useMemo(() => {
    if (images?.length) {
      return images
        .slice()
        .sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0))
        .map((i) => i.url ?? PLACEHOLDER)
        .filter(Boolean);
    }
    if (mainImageUrl) return [mainImageUrl];
    return [PLACEHOLDER];
  }, [images, mainImageUrl]);

  const slides = useMemo(
    () => imageList.map((src) => ({ src, alt: productName })),
    [imageList, productName],
  );

  const mainImage = imageList[selectedIndex] ?? imageList[0];

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className={styles.gallery}>
      {imageList.length > 1 && (
        <div className={styles.thumbnails}>
          {imageList.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              className={`${styles.thumbnailBtn} ${
                index === selectedIndex ? styles.thumbnailActive : ""
              }`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={url}
                alt=""
                width={72}
                height={72}
                className={styles.thumbnailImg}
              />
            </button>
          ))}
        </div>
      )}
      <div
        className={styles.mainWrapper}
        role="button"
        tabIndex={0}
        onClick={() => openLightbox(selectedIndex)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openLightbox(selectedIndex);
        }}
        aria-label="Open image gallery"
      >
        <img
          className={styles.mainImage}
          src={mainImage}
          alt={productName}
          width={500}
          height={500}
        />
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={selectedIndex}
        slides={slides}
        on={{ view: ({ index: i }) => setSelectedIndex(i) }}
      />
    </div>
  );
};

export default ProductImages;
