import { useTranslation } from "react-i18next";
import ContentWithImage from "src/components/ContentWithImage";
import { INFO_PAGES } from "src/consts/infoPages";
import type { InfoPageSlug } from "src/consts/infoPages";

type InfoPageProps = {
  pageSlug: InfoPageSlug;
};

const InfoPage: React.FC<InfoPageProps> = ({ pageSlug }) => {
  const { t } = useTranslation();
  const config = INFO_PAGES[pageSlug];

  if (!config) {
    return null;
  }

  const title = t(config.titleKey);
  const paragraphs = config.bodyKeys.map((key) => t(key));

  return (
    <ContentWithImage
      title={title}
      paragraphs={paragraphs}
      imageUrl={config.image}
      imageAlt={title}
    />
  );
};

export default InfoPage;
