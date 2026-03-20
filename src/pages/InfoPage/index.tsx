import { useTranslation } from "react-i18next";
import ContentWithImage from "src/components/ContentWithImage";
import { ARLIS_GOVERNMENT_DECISION_77 } from "src/consts/legalUrls";
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
  const bodyTexts = config.bodyKeys.map((key) => t(key));

  const bulletCount =
    "bulletCount" in config && typeof config.bulletCount === "number"
      ? config.bulletCount
      : undefined;

  const bullets =
    bulletCount !== undefined ? bodyTexts.slice(0, bulletCount) : undefined;
  const afterBullets =
    bulletCount !== undefined ? bodyTexts.slice(bulletCount) : bodyTexts;
  const signOff =
    bulletCount !== undefined && afterBullets.length > 0
      ? afterBullets[afterBullets.length - 1]
      : undefined;
  const paragraphs =
    bulletCount !== undefined && afterBullets.length > 1
      ? afterBullets.slice(0, -1)
      : afterBullets;

  const tipsHeading =
    bulletCount !== undefined ? t(`${config.sectionKey}.tipsHeading`) : undefined;

  const referenceLink =
    pageSlug === "returns"
      ? {
          href: ARLIS_GOVERNMENT_DECISION_77,
          label: t("returns.lawReferenceLabel"),
        }
      : undefined;

  return (
    <ContentWithImage
      title={title}
      paragraphs={paragraphs}
      bullets={bullets}
      tipsHeading={tipsHeading}
      signOff={signOff}
      referenceLink={referenceLink}
      imageUrl={config.image}
      imageAlt={title}
    />
  );
};

export default InfoPage;
