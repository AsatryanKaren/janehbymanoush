import { Typography, Skeleton, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "src/components/ProductCard";
import CardGrid from "src/components/CardGrid";
import { ROUTES } from "src/consts/routes";
import type { FeaturedProductsProps } from "./types";
import styles from "./styles.module.css";

const { Title } = Typography;

const SKELETON_CARD_COUNT = 4;

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  loading,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div>
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 1, width: 120 }}
                className={styles.skeletonLabel}
              />
              <Skeleton
                active
                title={{ width: 180 }}
                paragraph={false}
                className={styles.skeletonTitle}
              />
            </div>
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: 72 }}
              className={styles.skeletonViewAll}
            />
          </div>
          <div className={styles.tray}>
            <Row gutter={[24, 24]} className={styles.skeletonRow}>
              {Array.from({ length: SKELETON_CARD_COUNT }).map((_, i) => (
                <Col xs={24} sm={12} md={8} lg={6} key={i}>
                  <div className={styles.skeletonCard}>
                    <div className={styles.skeletonCardImage} />
                    <div className={styles.skeletonCardMeta}>
                      <Skeleton
                        active
                        title={false}
                        paragraph={{ rows: 1, width: "60%" }}
                        className={styles.skeletonMetaLine}
                      />
                      <Skeleton
                        active
                        title={false}
                        paragraph={{ rows: 1, width: "80%" }}
                        className={styles.skeletonMetaLine}
                      />
                      <Skeleton
                        active
                        title={{ width: 80 }}
                        paragraph={false}
                        className={styles.skeletonMetaLine}
                      />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>
              {t("home.bestSellersLabel")}
            </span>
            <Title level={2} className={styles.title}>
              {t("home.bestSellers")}
            </Title>
          </div>
          <Link to={ROUTES.CATALOG} className={styles.viewAll}>
            {t("home.viewAll")}
          </Link>
        </div>
        <div className={styles.tray}>
          <CardGrid preset="product">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="compact"
              />
            ))}
          </CardGrid>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
