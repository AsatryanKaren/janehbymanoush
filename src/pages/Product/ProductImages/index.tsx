import { useState, useMemo, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { ProductImagesProps } from "./types";
import styles from "./styles.module.css";

const PLACEHOLDER = "/placeholder.jpg";
const MOBILE_THUMB_SLOTS = 4;
const GALLERY_BREAKPOINT_PX = 1024;

const ProductImages: React.FC<ProductImagesProps> = ({
  images,
  mainImageUrl,
  productName,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= GALLERY_BREAKPOINT_PX,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${GALLERY_BREAKPOINT_PX}px)`);
    setIsMobile(mq.matches);
    const fn = () => setIsMobile(window.innerWidth <= GALLERY_BREAKPOINT_PX);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

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
    () =>
      imageList.map((src) => ({ src: encodeURI(src), alt: productName })),
    [imageList, productName],
  );

  const mainImage = imageList[selectedIndex] ?? imageList[0];
  const maxThumbnails = 6;
  const visibleThumbnails = imageList.slice(0, maxThumbnails);
  const hasMoreImages = imageList.length > maxThumbnails;
  const moreCount = imageList.length - maxThumbnails;

  const mobileSlots = useMemo(() => {
    if (!isMobile || imageList.length <= 1) return [];
    const slots: { url: string; index: number; showMore: boolean; moreCount: number }[] = [];
    for (let i = 0; i < MOBILE_THUMB_SLOTS; i++) {
      if (i < imageList.length) {
        const isLastSlot = i === MOBILE_THUMB_SLOTS - 1;
        const showMore = isLastSlot && imageList.length > MOBILE_THUMB_SLOTS;
        slots.push({
          url: imageList[i] ?? PLACEHOLDER,
          index: i,
          showMore,
          moreCount: showMore ? imageList.length - MOBILE_THUMB_SLOTS : 0,
        });
      } else {
        slots.push({
          url: PLACEHOLDER,
          index: -1,
          showMore: false,
          moreCount: 0,
        });
      }
    }
    return slots;
  }, [isMobile, imageList]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const renderThumbnails = () => {
    if (isMobile && mobileSlots.length > 0) {
      return (
        <div className={styles.thumbnails} data-mobile-slots={MOBILE_THUMB_SLOTS}>
          {mobileSlots.map((slot, i) => (
            <button
              key={slot.index >= 0 ? `${slot.url}-${slot.index}` : `empty-${i}`}
              type="button"
              className={`${styles.thumbnailBtn} ${
                slot.index === selectedIndex ? styles.thumbnailActive : ""
              } ${slot.index < 0 ? styles.thumbnailEmpty : ""}`}
              onClick={() =>
                slot.showMore
                  ? openLightbox(0)
                  : slot.index >= 0 && setSelectedIndex(slot.index)
              }
              aria-label={
                slot.showMore
                  ? `View all ${imageList.length} images`
                  : slot.index >= 0
                    ? `View image ${slot.index + 1}`
                    : undefined
              }
              disabled={slot.index < 0}
            >
              {slot.index >= 0 && (
                <>
                  <img
                    src={encodeURI(slot.url)}
                    alt=""
                    width={72}
                    height={72}
                    className={styles.thumbnailImg}
                  />
                  {slot.showMore && (
                    <span className={styles.thumbnailMoreOverlay}>
                      +{slot.moreCount}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      );
    }
    return (
      <div className={styles.thumbnails}>
        {visibleThumbnails.map((url, index) => {
          const isLastWithMore =
            hasMoreImages && index === visibleThumbnails.length - 1;
          return (
            <button
              key={`${url}-${index}`}
              type="button"
              className={`${styles.thumbnailBtn} ${
                index === selectedIndex ? styles.thumbnailActive : ""
              }`}
              onClick={() =>
                isLastWithMore ? openLightbox(0) : setSelectedIndex(index)
              }
              aria-label={
                isLastWithMore
                  ? `View all ${imageList.length} images`
                  : `View image ${index + 1}`
              }
            >
              <img
                src={encodeURI(url)}
                alt=""
                width={72}
                height={72}
                className={styles.thumbnailImg}
              />
              {isLastWithMore && (
                <span className={styles.thumbnailMoreOverlay}>
                  +{moreCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.gallery}>
      {imageList.length > 1 && renderThumbnails()}
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
          src={encodeURI(mainImage ?? "")}
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
