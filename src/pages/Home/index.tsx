import { useEffect, useState } from "react";
import Banner from "src/components/Banner";
import CuratedEdits from "src/components/CuratedEdits";
import HeritageSection from "src/components/HeritageSection";
import OurCollections from "src/components/OurCollections";
import PromoSection from "src/components/PromoSection";
import FeaturedProducts from "src/components/FeaturedProducts";
import NewsletterSection from "src/components/NewsletterSection";
import GalleryRow from "src/components/GalleryRow";
import { getBestsellers } from "src/api/bestsellers";
import { collectionsApi } from "src/api/collections";
import type { ProductCardPublic } from "src/types/product";
import type { AdminCollectionItem } from "src/types/collection";

const HomePage: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<ProductCardPublic[]>([]);
  const [bestsellersLoading, setBestsellersLoading] = useState(true);
  const [collections, setCollections] = useState<AdminCollectionItem[] | null>(
    null,
  );

  useEffect(() => {
    getBestsellers()
      .then((res) => setBestsellers(res.items ?? []))
      .catch(() => setBestsellers([]))
      .finally(() => setBestsellersLoading(false));
  }, []);

  useEffect(() => {
    void collectionsApi
      .getAll()
      .then((res) => setCollections(res.items ?? []))
      .catch(() => setCollections([]));
  }, []);

  return (
    <>
      <Banner />
      <CuratedEdits collections={collections} />
      <HeritageSection />
      <PromoSection />
      <FeaturedProducts
        products={bestsellers}
        loading={bestsellersLoading}
      />
      <OurCollections collections={collections} />
      <NewsletterSection />
      <GalleryRow />
    </>
  );
};

export default HomePage;
