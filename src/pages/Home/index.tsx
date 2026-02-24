import Banner from "src/components/Banner";
import CuratedEdits from "src/components/CuratedEdits";
import HeritageSection from "src/components/HeritageSection";
import OurCollections from "src/components/OurCollections";
import PromoSection from "src/components/PromoSection";
import FeaturedProducts from "src/components/FeaturedProducts";
import NewsletterSection from "src/components/NewsletterSection";
import GalleryRow from "src/components/GalleryRow";
import { MOCK_BEST_SELLERS } from "src/mocks/bestSellers";

const HomePage: React.FC = () => {
  return (
    <>
      <Banner />
      <CuratedEdits />
      <HeritageSection />
      <PromoSection />
      <FeaturedProducts
        products={MOCK_BEST_SELLERS}
        loading={false}
      />
      <OurCollections />
      <NewsletterSection />
      <GalleryRow />
    </>
  );
};

export default HomePage;
