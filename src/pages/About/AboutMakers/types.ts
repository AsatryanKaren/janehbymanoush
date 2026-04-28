export type JewelryMaker = {
  /** From API; used for stable list keys */
  id?: string;
  name: string;
  description: string;
  role?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type AboutMakersProps = {
  title: string;
  makers: JewelryMaker[];
  sectionId?: string;
};
