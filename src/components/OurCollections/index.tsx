import { useEffect, useState } from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productsApi } from "src/api/products";
import { ROUTES } from "src/consts/routes";
import type { AdminCollectionItem } from "src/types/collection";
import styles from "./styles.module.css";

export type OurCollectionsProps = {
  collections?: AdminCollectionItem[] | null;
};

const { Title } = Typography;

const MAX_COLLECTIONS = 4;

function getCollectionTitle(
  item: AdminCollectionItem,
  lang: string,
): string {
  if (lang === "hy" && item.nameHy) return item.nameHy;
  if (lang === "ru" && item.nameRu) return item.nameRu;
  return item.nameEn ?? item.nameHy ?? item.nameRu ?? item.name ?? "";
}

type CollectionCard = {
  collection: AdminCollectionItem;
  imageUrl: string | null;
};

const OurCollections: React.FC<OurCollectionsProps> = (
  props: OurCollectionsProps,
) => {
  const { collections: collectionsProp = null } = props;
  const { t, i18n } = useTranslation();
  const [cards, setCards] = useState<CollectionCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (collectionsProp === null) return;
    const items = collectionsProp.slice(0, MAX_COLLECTIONS);
    if (items.length === 0) {
      setCards([]);
      setLoading(false);
      return;
    }
    let cancelled = false;

    void (async () => {
      try {
        const results: CollectionCard[] = await Promise.all(
          items.map(async (collection) => {
            const resProducts = await productsApi.getAll({
              CollectionId: collection.id,
              PageSize: "20",
            });
            const products = resProducts.items ?? [];
            const product =
              products.length > 0
                ? products[Math.floor(Math.random() * products.length)]
                : null;
            const imageUrl = product?.mainImageUrl ?? null;
            return { collection, imageUrl };
          }),
        );
        if (!cancelled) setCards(results);
      } catch {
        if (!cancelled) setCards([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [collectionsProp]);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div>
              <span className={styles.label}>
                {t("home.ourCollections.label")}
              </span>
              <Title level={2} className={styles.title}>
                {t("home.ourCollections.title")}
              </Title>
            </div>
            <Link to={ROUTES.CATALOG} className={styles.viewAll}>
              {t("home.ourCollections.viewAll")}
            </Link>
          </div>
          <div className={styles.cardsRow}>
            {Array.from({ length: MAX_COLLECTIONS }).map((_, i) => (
              <div className={styles.card} key={i}>
                <div className={styles.skeletonImage} />
                <span className={styles.cardLabelSkeleton} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cards.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>
              {t("home.ourCollections.label")}
            </span>
            <Title level={2} className={styles.title}>
              {t("home.ourCollections.title")}
            </Title>
          </div>
          <Link to={ROUTES.CATALOG} className={styles.viewAll}>
            {t("home.ourCollections.viewAll")}
          </Link>
        </div>
        <div className={styles.cardsRow}>
          {cards.map(({ collection, imageUrl }) => (
            <Link
              to={`${ROUTES.CATALOG}?collection=${encodeURIComponent(collection.id)}`}
              className={styles.card}
              key={collection.id}
            >
              {imageUrl ? (
                <img
                  src={encodeURI(imageUrl)}
                  alt=""
                  className={styles.cardImage}
                  loading="lazy"
                />
              ) : (
                <div className={styles.cardPlaceholder} />
              )}
              <span className={styles.cardLabel}>
                {getCollectionTitle(collection, i18n.language)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCollections;
