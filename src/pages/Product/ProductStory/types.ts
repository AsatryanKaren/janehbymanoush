export type ProductStoryProps = {
  collectionName: string | null;
  productName: string;
  storyText: string | null;
  storyImageUrl: string | null;
  /** Product image from API (images) used as left side background */
  backgroundImageUrl: string | null;
};
