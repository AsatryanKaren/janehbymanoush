import { useTranslation } from "react-i18next";
import type { ProductStoryProps } from "./types";
import styles from "./styles.module.css";

const ProductStory: React.FC<ProductStoryProps> = ({
  collectionName,
  productName,
  storyText,
  storyImageUrl,
  backgroundImageUrl,
}) => {
  const { t } = useTranslation();
  const hasContent = storyText || storyImageUrl || collectionName || productName;
  if (!hasContent) return null;

  const showStoryImage = Boolean(storyImageUrl);
  const showTextSide = Boolean(collectionName || productName || storyText);

  return (
    <section className={styles.wrapper} aria-label="Product story">
      {showTextSide && (
        <div className={styles.textSide}>
          {backgroundImageUrl && (
            <img
              src={backgroundImageUrl}
              alt=""
              className={styles.backgroundImage}
              aria-hidden
            />
          )}
          <div className={styles.textOverlay} aria-hidden />
          <div className={styles.textContent}>
            {(collectionName || productName) && (
              <h2 className={styles.title}>
                {collectionName && <>«{collectionName}»</>}
                {collectionName && productName && <br />}
                {productName}
              </h2>
            )}
            {storyText && <p className={styles.storyText}>{storyText}</p>}
            <p className={styles.footer}>{t("product.createdInYerevan")}</p>
          </div>
        </div>
      )}
      {showStoryImage && (
        <div className={styles.storyImageSide}>
          <img
            src={storyImageUrl!}
            alt=""
            className={styles.storyImage}
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
};

export default ProductStory;
