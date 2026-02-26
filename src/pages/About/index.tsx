import AboutHero from "src/pages/About/AboutHero";
import AboutHeritage from "src/pages/About/AboutHeritage";
import AboutCraft from "src/pages/About/AboutCraft";
import AboutValues from "src/pages/About/AboutValues";
import AboutQuickLinks from "src/pages/About/AboutQuickLinks";
import AboutCta from "src/pages/About/AboutCta";
import { ABOUT_IMAGES } from "./consts";
import styles from "./styles.module.css";

const AboutPage: React.FC = () => {
  return (
    <article className={styles.page}>
      <AboutHero imageUrl={ABOUT_IMAGES.hero} />
      <AboutHeritage imageUrl={ABOUT_IMAGES.heritage} />
      <AboutValues />
      <AboutCraft />
      <AboutQuickLinks />
      <AboutCta imageUrl={ABOUT_IMAGES.cta} />
    </article>
  );
};

export default AboutPage;
