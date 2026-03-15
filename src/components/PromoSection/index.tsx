import { useEffect, useState } from "react";
import { Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { productsApi } from "src/api/products";
import { ROUTES } from "src/consts/routes";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const PromoSection: React.FC = () => {
  const { t } = useTranslation();
  const [promoImageUrl, setPromoImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void productsApi
      .getAll({ New: "true", PageSize: "50" })
      .then((res) => {
        const items = res.items ?? [];
        if (cancelled) return;
        if (items.length > 0) {
          const randomIndex = Math.floor(Math.random() * items.length);
          const product = items[randomIndex];
          const url = product?.mainImageUrl ?? null;
          if (url) setPromoImageUrl(url);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const showImage = Boolean(promoImageUrl);
  const showSkeleton = loading || !showImage;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Row gutter={[48, 32]} align="middle">
          <Col xs={24} lg={{ span: 12, order: 1 }}>
            <div className={styles.imageWrap}>
              {showSkeleton ? (
                <div className={styles.skeletonImage} />
              ) : (
                <img
                  src={encodeURI(promoImageUrl!)}
                  alt=""
                  className={styles.image}
                  loading="lazy"
                />
              )}
            </div>
          </Col>
          <Col xs={24} lg={{ span: 12, order: 2 }}>
            <div className={styles.contentWrap}>
              <Text className={styles.label}>
                {t("home.promoSection.label")}
              </Text>
              <Title level={2} className={styles.heading}>
                {t("home.promoSection.heading")}
              </Title>
              <Text className={styles.body}>
                {t("home.promoSection.body")}
              </Text>
              <Link to={ROUTES.NEW} className={styles.ctaLink}>
                {t("home.promoSection.cta")}
                <RightOutlined className={styles.ctaIcon} />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default PromoSection;
