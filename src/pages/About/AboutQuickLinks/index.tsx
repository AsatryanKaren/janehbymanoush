import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QUICK_LINKS } from "./consts";
import styles from "./styles.module.css";

const AboutQuickLinks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.block} aria-label={t("about.quickLinks.title")}>
      <div className={styles.inner}>
        <p className={styles.label}>{t("about.quickLinks.label")}</p>
        <h2 className={styles.title}>{t("about.quickLinks.title")}</h2>
        <div className={styles.divider} aria-hidden />
        <nav className={styles.links}>
          <div className={styles.linksColumn}>
            {QUICK_LINKS.slice(0, 2).map(({ path, i18nKey, icon: Icon }) => (
              <Link key={path} to={path} className={styles.link}>
                <span className={styles.linkIcon}>
                  <Icon />
                </span>
                <span className={styles.linkText}>{t(i18nKey)}</span>
                <span className={styles.linkArrow} aria-hidden>
                  <RightOutlined />
                </span>
              </Link>
            ))}
          </div>
          <div className={styles.linksColumn}>
            {QUICK_LINKS.slice(2, 4).map(({ path, i18nKey, icon: Icon }) => (
              <Link key={path} to={path} className={styles.link}>
                <span className={styles.linkIcon}>
                  <Icon />
                </span>
                <span className={styles.linkText}>{t(i18nKey)}</span>
                <span className={styles.linkArrow} aria-hidden>
                  <RightOutlined />
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default AboutQuickLinks;
