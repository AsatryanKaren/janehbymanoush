import type { Product } from "src/types/product";

/** Mock products matching /api/v1/products response shape. Used when API is unavailable. */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "golden-pomegranate-necklace",
    name: "Golden Pomegranate Necklace",
    gender: 0,
    category: "necklace",
    collectionId: "col-1",
    collectionName: "Van",
    price: 189,
    mainImageUrl: "https://placehold.co/600x600?text=Necklace",
    isActive: true,
    description: "A delicate gold necklace featuring a hand-carved pomegranate pendant.",
  },
  {
    id: "2",
    slug: "armenian-cross-earrings",
    name: "Armenian Cross Earrings",
    gender: 0,
    category: "akanjvogh",
    collectionId: "col-1",
    collectionName: "Van",
    price: 125,
    mainImageUrl: "https://placehold.co/600x600?text=Earrings",
    isActive: true,
  },
  {
    id: "3",
    slug: "ararat-signet-ring",
    name: "Ararat Signet Ring",
    gender: 1,
    category: "ring",
    collectionId: "col-2",
    collectionName: "Yerevan",
    price: 295,
    mainImageUrl: "https://placehold.co/600x600?text=Ring",
    isActive: true,
  },
];
