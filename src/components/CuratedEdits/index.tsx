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

/** Collections whose catalog `total` is at least `minCount` (single-item page + `total`). */
async function filterCollectionsWithMinProductCount(
  collections: AdminCollectionItem[],
  minCount: number,
): Promise<AdminCollectionItem[]> {
  const withIds = collections.filter((c): c is AdminCollectionItem & { id: string } =>
    Boolean(c.id),
  );
  const settled = await Promise.allSettled(
    withIds.map(async (c) => {
      const res = await productsApi.getAll({
        CollectionId: c.id,
        PageSize: "1",
      });
      return { collection: c, total: res.total ?? 0 };
    }),
  );
  const eligible: AdminCollectionItem[] = [];
  for (const s of settled) {
    if (s.status === "fulfilled" && s.value.total >= minCount) {
      eligible.push(s.value.collection);
    }
  }
  return eligible;
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
        const eligible = await filterCollectionsWithMinProductCount(
          collectionsList,
          MAX_ITEMS,
        );
        if (cancelled) return;
        if (eligible.length === 0) {
          setCollection(null);
          setProducts([]);
          setLoading(false);
          return;
        }
        const chosen = eligible[Math.floor(Math.random() * eligible.length)];
        if (!chosen?.id) {
          setCollection(null);
          setProducts([]);
          setLoading(false);
          return;
        }
        const res = await productsApi.getAll({
          CollectionId: chosen.id,
          PageSize: String(MAX_ITEMS),
        });
        if (cancelled) return;
        setCollection(chosen);
        setProducts((res.items ?? []).slice(0, MAX_ITEMS));
      } catch {
        if (!cancelled) {
          setCollection(null);
          setProducts([]);
        }
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
