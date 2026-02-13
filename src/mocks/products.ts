import { ProductCategory } from "@/types/product";
import type { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Golden Pomegranate Necklace",
    slug: "golden-pomegranate-necklace",
    description:
      "A delicate gold necklace featuring a hand-carved pomegranate pendant, symbolizing prosperity and Armenian heritage.",
    price: 189,
    currency: "USD",
    category: ProductCategory.Women,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    ],
    inStock: true,
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Armenian Cross Earrings",
    slug: "armenian-cross-earrings",
    description:
      "Elegant drop earrings with traditional Armenian cross motifs, crafted in sterling silver with gold accents.",
    price: 125,
    currency: "USD",
    category: ProductCategory.Women,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop",
    ],
    inStock: true,
    createdAt: "2025-02-10T00:00:00Z",
    updatedAt: "2025-02-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Ararat Signet Ring",
    slug: "ararat-signet-ring",
    description:
      "A bold signet ring engraved with Mount Ararat silhouette, handcrafted in solid 14k gold.",
    price: 295,
    currency: "USD",
    category: ProductCategory.Men,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
    ],
    inStock: true,
    createdAt: "2025-03-05T00:00:00Z",
    updatedAt: "2025-03-05T00:00:00Z",
  },
  {
    id: "4",
    name: "Lavash Cuff Bracelet",
    slug: "lavash-cuff-bracelet",
    description:
      "A textured cuff bracelet inspired by the patterns of traditional Armenian lavash, made from brushed silver.",
    price: 165,
    currency: "USD",
    category: ProductCategory.Unisex,
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop",
    ],
    inStock: false,
    createdAt: "2025-04-20T00:00:00Z",
    updatedAt: "2025-04-20T00:00:00Z",
  },
  {
    id: "5",
    name: "Eternity Knot Pendant",
    slug: "eternity-knot-pendant",
    description:
      "A minimalist pendant featuring the Armenian eternity knot, symbolizing everlasting life. Sterling silver chain included.",
    price: 145,
    currency: "USD",
    category: ProductCategory.Women,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop",
    ],
    inStock: true,
    createdAt: "2025-05-12T00:00:00Z",
    updatedAt: "2025-05-12T00:00:00Z",
  },
  {
    id: "6",
    name: "Obsidian Chain Bracelet",
    slug: "obsidian-chain-bracelet",
    description:
      "A masculine chain bracelet with natural Armenian obsidian stone accents, set in oxidized silver.",
    price: 210,
    currency: "USD",
    category: ProductCategory.Men,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop",
    ],
    inStock: true,
    createdAt: "2025-06-08T00:00:00Z",
    updatedAt: "2025-06-08T00:00:00Z",
  },
  {
    id: "7",
    name: "Duduk Charm Necklace",
    slug: "duduk-charm-necklace",
    description:
      "A dainty necklace with a miniature duduk instrument charm, celebrating Armenian musical heritage.",
    price: 135,
    currency: "USD",
    category: ProductCategory.Women,
    images: [
      "https://placehold.co/600x600/f0f0f0/999?text=Necklace",
    ],
    inStock: true,
    createdAt: "2025-07-01T00:00:00Z",
    updatedAt: "2025-07-01T00:00:00Z",
  },
  {
    id: "8",
    name: "Khachkar Tie Clip",
    slug: "khachkar-tie-clip",
    description:
      "A refined tie clip featuring intricate khachkar (stone cross) engravings, crafted in polished stainless steel.",
    price: 85,
    currency: "USD",
    category: ProductCategory.Men,
    images: [
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&h=600&fit=crop",
    ],
    inStock: true,
    createdAt: "2025-08-18T00:00:00Z",
    updatedAt: "2025-08-18T00:00:00Z",
  },
];
