import Banner from "src/components/Banner";
import CuratedEdits from "src/components/CuratedEdits";
import HeritageSection from "src/components/HeritageSection";
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
      <FeaturedProducts
        products={MOCK_BEST_SELLERS}
        loading={false}
      />
      <NewsletterSection />
      <GalleryRow />
    </>
  );
};

export default HomePage;
