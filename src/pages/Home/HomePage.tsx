import Banner from "@/components/Banner/Banner";
import CuratedEdits from "@/components/CuratedEdits/CuratedEdits";
import HeritageSection from "@/components/HeritageSection/HeritageSection";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";
import GalleryRow from "@/components/GalleryRow/GalleryRow";
import { MOCK_BEST_SELLERS } from "@/mocks/bestSellers";

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
