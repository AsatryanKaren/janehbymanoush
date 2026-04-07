import GalleryPage from "src/components/GalleryPage";
import { galleryPageImages } from "./consts";

const GalleryRoutePage: React.FC = () => {
  return <GalleryPage images={galleryPageImages} />;
};

export default GalleryRoutePage;
