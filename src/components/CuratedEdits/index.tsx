import { useEffect, useState } from "react";
import { Typography, Row, Col, Grid, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productsApi } from "src/api/products";
import { ROUTES, buildProductPath } from "src/consts/routes";
import type { AdminCollectionItem } from "src/types/collection";
import type { ProductCardPublic } from "src/types/product";
import styles from "./styles.module.css";

export type CuratedEditsProps = {
  collections?: AdminCollectionItem[] | null;
};

const { Title } = Typography;
const { useBreakpoint } = Grid;

const MAX_ITEMS = 4;
const MIN_ITEMS_TO_SHOW = 2;

function getCollectionTitle(
  item: AdminCollectionItem,
  lang: string,
): string {
  if (lang === "hy" && item.nameHy) return item.nameHy;
  if (lang === "ru" && item.nameRu) return item.nameRu;
  return item.nameEn ?? item.nameHy ?? item.nameRu ?? item.name ?? "";
}

function getProductTitle(product: ProductCardPublic, lang: string): string {
  if (lang === "hy" && product.nameHy) return product.nameHy;
  if (lang === "ru" && product.nameRu) return product.nameRu;
  return (
    product.nameEn ?? product.nameHy ?? product.nameRu ?? product.name ?? ""
  );
}

async function fetchCollectionWithProducts(
  collections: AdminCollectionItem[],
  excludeId: string | null,
): Promise<{ collection: AdminCollectionItem; products: ProductCardPublic[] } | null> {
  const available = excludeId
    ? collections.filter((c) => c.id !== excludeId)
    : collections;
  if (available.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * available.length);
  const chosen = available[randomIndex];
  if (!chosen?.id) return null;
  const res = await productsApi.getAll({
    CollectionId: chosen.id,
    PageSize: String(MAX_ITEMS),
  });
  const list = (res.items ?? []).slice(0, MAX_ITEMS);
  return { collection: chosen, products: list };
}

const CuratedEdits: React.FC<CuratedEditsProps> = ({
  collections: collectionsProp = null,
}) => {
  const { t, i18n } = useTranslation();
  const screens = useBreakpoint();
  const isMobile = Boolean(screens.xs && !screens.md);

  const [collection, setCollection] = useState<AdminCollectionItem | null>(null);
  const [products, setProducts] = useState<ProductCardPublic[]>([]);
  const [loading, setLoading] = useState(true);

  const collectionsList = collectionsProp ?? [];

  useEffect(() => {
    if (collectionsProp === null) return;
    if (collectionsList.length === 0) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);

    void (async () => {
      try {
        const first = await fetchCollectionWithProducts(
          collectionsList,
          null,
        );
        if (cancelled) return;
        if (!first) {
          setLoading(false);
          return;
        }
        if (first.products.length >= MIN_ITEMS_TO_SHOW) {
          setCollection(first.collection);
          setProducts(first.products);
          setLoading(false);
          return;
        }
        const second = await fetchCollectionWithProducts(
          collectionsList,
          first.collection.id,
        );
        if (cancelled) return;
        const result =
          second && second.products.length > first.products.length
            ? second
            : first;
        setCollection(result.collection);
        setProducts(result.products);
      } catch {
        if (!cancelled) setCollection(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [collectionsProp]);

  if (loading) {
    const skeletonCount = isMobile ? 2 : 4;
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <div>
            <Skeleton
              active
              title={{ width: 220 }}
              paragraph={false}
              className={styles.skeletonTitle}
            />
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: 320 }}
              className={styles.skeletonSubtitle}
            />
          </div>
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 1, width: 80 }}
            className={styles.skeletonBrowseAll}
          />
        </div>
        <Row gutter={[24, 32]}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <Col xs={12} md={6} key={i}>
              <div className={styles.card}>
                <div className={styles.skeletonImageWrap} />
                <Skeleton
                  active
                  title={{ width: "80%" }}
                  paragraph={false}
                  className={styles.skeletonCardTitle}
                />
              </div>
            </Col>
          ))}
        </Row>
      </section>
    );
  }

  if (!collection) return null;

  const collectionTitle = getCollectionTitle(collection, i18n.language);
  const displayItems = isMobile
    ? products.slice(0, 2)
    : products.slice(0, MAX_ITEMS);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <Title level={2} className={styles.title}>
            {collectionTitle}
          </Title>
          <span className={styles.subtitle}>
            {t("home.curatedEdits.subtitleDefault")}
          </span>
        </div>
        <Link to={ROUTES.CATALOG} className={styles.browseAll}>
          {t("home.curatedEdits.browseAll")}
        </Link>
      </div>
      {displayItems.length > 0 ? (
        <Row gutter={[24, 32]}>
          {displayItems.map((product) => (
            <Col xs={12} md={6} key={product.id}>
              <Link
                to={buildProductPath(product.slug ?? "")}
                className={styles.card}
              >
                <div
                  className={styles.imageWrap}
                  style={{
                    backgroundImage: product.mainImageUrl
                      ? `url(${encodeURI(product.mainImageUrl)})`
                      : undefined,
                  }}
                />
                <Title level={5} className={styles.cardTitle}>
                  {getProductTitle(product, i18n.language)}
                </Title>
              </Link>
            </Col>
          ))}
        </Row>
      ) : null}
    </section>
  );
};

export default CuratedEdits;
