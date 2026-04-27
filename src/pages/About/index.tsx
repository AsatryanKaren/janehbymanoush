import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AboutHero from "src/pages/About/AboutHero";
import AboutHeritage from "src/pages/About/AboutHeritage";
import AboutCraft from "src/pages/About/AboutCraft";
import AboutMakers from "src/pages/About/AboutMakers";
import { masterPublicToJewelryMaker } from "src/pages/About/AboutMakers/utils";
import AboutValues from "src/pages/About/AboutValues";
import AboutQuickLinks from "src/pages/About/AboutQuickLinks";
import AboutCta from "src/pages/About/AboutCta";
import { getMasters } from "src/api/masters.api";
import type { MasterItemPublic } from "src/types/master";
import type { JewelryMaker } from "src/pages/About/AboutMakers/types";
import { ABOUT_IMAGES } from "./consts";
import styles from "./styles.module.css";

const localePrefix = (lng: string): string => lng.split("-")[0] ?? "en";

const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [apiItems, setApiItems] = useState<MasterItemPublic[]>([]);
  const [makersLoading, setMakersLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setMakersLoading(true);
    getMasters()
      .then((res) => {
        if (!cancelled) {
          setApiItems(res.items ?? []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setApiItems([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setMakersLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const lang = localePrefix(i18n.language);
  const makers: JewelryMaker[] = useMemo(
    () => apiItems.map((item) => masterPublicToJewelryMaker(item, lang)),
    [apiItems, lang],
  );

  return (
    <article className={styles.page}>
      <AboutHero imageUrl={ABOUT_IMAGES.hero} />
      <AboutHeritage imageUrl={ABOUT_IMAGES.heritage} />
      <AboutValues />
      {!makersLoading && makers.length > 0 ? (
        <AboutMakers
          title={t("about.makers.title")}
          intro={t("about.makers.intro")}
          makers={makers}
        />
      ) : null}
      <AboutCraft />
      <AboutQuickLinks />
      <AboutCta imageUrl={ABOUT_IMAGES.cta} />
    </article>
  );
};

export default AboutPage;
