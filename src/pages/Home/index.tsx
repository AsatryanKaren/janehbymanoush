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
import type { ProductCardPublic } from "src/types/product";

const HomePage: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<ProductCardPublic[]>([]);
  const [bestsellersLoading, setBestsellersLoading] = useState(true);

  useEffect(() => {
    getBestsellers()
      .then((res) => setBestsellers(res.items ?? []))
      .catch(() => setBestsellers([]))
      .finally(() => setBestsellersLoading(false));
  }, []);

  return (
    <>
      <Banner />
      <CuratedEdits />
      <HeritageSection />
      <PromoSection />
      <FeaturedProducts
        products={bestsellers}
        loading={bestsellersLoading}
      />
      <OurCollections />
      <NewsletterSection />
      <GalleryRow />
    </>
  );
};

export default HomePage;
