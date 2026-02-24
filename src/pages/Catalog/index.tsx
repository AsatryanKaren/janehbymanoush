import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Spin, Typography, Flex, Select, Pagination, Slider } from "antd";
import { useTranslation } from "react-i18next";
import ProductCard from "src/components/ProductCard";
import CardGrid from "src/components/CardGrid";
import CatalogEmptyState from "src/components/CatalogEmptyState";
import { productsApi } from "src/api/products";
import { categoriesApi } from "src/api/categories";
import type { Product } from "src/types/product";
import type { CategoryItem } from "src/types/category";
import { ROUTES } from "src/consts/routes";
import { formatPrice } from "src/utils/formatPrice";
import {
  CATEGORY_MAP,
  TITLE_KEY_MAP,
  SORT_PARAMS,
  type SortValue,
} from "./consts";
import styles from "./styles.module.css";

const { Title } = Typography;

const PAGE_SIZE = 12;

const getCategoryTitle = (item: CategoryItem, lang: string): string => {
  if (lang === "hy" && item.titleHy) return item.titleHy;
  if (lang === "ru" && item.titleRu) return item.titleRu;
  return item.titleEn ?? item.titleHy ?? item.titleRu ?? "";
};

const CatalogPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortValue>("price_asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const pathCategory = CATEGORY_MAP[location.pathname];
  const pathIsNew = location.pathname === ROUTES.NEW;
  const titleKey = TITLE_KEY_MAP[location.pathname] ?? "catalog.catalog";

  useEffect(() => {
    void categoriesApi
      .getAll()
      .then((res) => setCategories(res.items ?? []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = pathCategory
      ? { Category: pathCategory }
      : {};
    if (selectedCategoryId) params.CategoryId = selectedCategoryId;
    if (pathIsNew) params.IsNew = "true";
    const { SortBy, SortOrder } = SORT_PARAMS[sort];
    params.SortBy = SortBy;
    params.SortOrder = SortOrder;
    params.Page = String(page);
    params.PageSize = String(PAGE_SIZE);
    productsApi
      .getAll(params)
      .then((res) => {
        setProducts(res.items ?? []);
        setTotal(res.total ?? res.items?.length ?? 0);
      })
      .catch(() => {
        setProducts([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [pathCategory, pathIsNew, selectedCategoryId, sort, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <span className={styles.sectionTitle}>
            {t("catalog.sections.categories")}
          </span>
          <ul className={styles.categoryList}>
            <li className={styles.categoryItem}>
              <Link
                to={location.pathname}
                className={
                  !selectedCategoryId ? styles.categoryLinkActive : styles.categoryLink
                }
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategoryId(null);
                  setPage(1);
                }}
              >
                {t("catalog.all")}
                {total > 0 && <span className={styles.badge}>{total}</span>}
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id} className={styles.categoryItem}>
                <Link
                  to={location.pathname}
                  className={
                    selectedCategoryId === cat.id
                      ? styles.categoryLinkActive
                      : styles.categoryLink
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategoryId(cat.id);
                    setPage(1);
                  }}
                >
                  {getCategoryTitle(cat, i18n.language)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.sidebarSection} ${styles.filtersSection}`}>
          <span className={styles.sectionTitle}>
            {t("catalog.sections.filters")}
          </span>
          <Link
            to={ROUTES.CATALOG}
            className={
              location.pathname === ROUTES.CATALOG
                ? styles.categoryLinkActive
                : styles.categoryLink
            }
          >
            {t("catalog.all")}
          </Link>
          <Link
            to={ROUTES.WOMEN}
            className={
              location.pathname === ROUTES.WOMEN
                ? styles.categoryLinkActive
                : styles.categoryLink
            }
            style={{ display: "block", marginTop: 12 }}
          >
            {t("nav.woman")}
          </Link>
          <Link
            to={ROUTES.MEN}
            className={
              location.pathname === ROUTES.MEN
                ? styles.categoryLinkActive
                : styles.categoryLink
            }
            style={{ display: "block", marginTop: 12 }}
          >
            {t("nav.man")}
          </Link>
          <Link
            to={ROUTES.NEW}
            className={
              location.pathname === ROUTES.NEW
                ? styles.categoryLinkActive
                : styles.categoryLink
            }
            style={{ display: "block", marginTop: 12 }}
          >
            {t("nav.new")}
          </Link>
          <div className={styles.priceRangeWrap}>
            <span className={styles.priceRangeLabel}>
              {t("catalog.priceRange")}
            </span>
            <Slider
              range
              min={0}
              max={500000}
              value={priceRange}
              onChange={(v) => setPriceRange(v as [number, number])}
              className={styles.priceRangeSlider}
            />
            <span className={styles.priceRangeValue}>
              {formatPrice(priceRange[0], "AMD", i18n.language)} –{" "}
              {formatPrice(priceRange[1], "AMD", i18n.language)}
            </span>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <Title level={1} className={styles.title}>
              {t(titleKey)}
            </Title>
          </div>
          <div className={styles.sortWrap} data-catalog-sort>
            <span className={styles.sortLabel}>{t("catalog.sortBy")}</span>
            <Select<SortValue>
              value={sort}
              onChange={(v) => {
                setSort(v);
                setPage(1);
              }}
              style={{ width: 200 }}
              popupClassName="catalog-sort-dropdown"
              options={[
                { value: "price_asc", label: t("catalog.sort.priceLowToHigh") },
                { value: "price_desc", label: t("catalog.sort.priceHighToLow") },
                { value: "date_desc", label: t("catalog.sort.dateNewToOld") },
                { value: "date_asc", label: t("catalog.sort.dateOldToNew") },
              ]}
            />
          </div>
        </div>

        {loading ? (
          <Flex justify="center" style={{ padding: "48px 0" }}>
            <Spin size="large" />
          </Flex>
        ) : products.length === 0 ? (
          <CatalogEmptyState />
        ) : (
          <>
            <div className={styles.gridWrap}>
              <CardGrid preset="catalog">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </CardGrid>
            </div>
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Pagination
                  current={page}
                  total={total}
                  pageSize={PAGE_SIZE}
                  showSizeChanger={false}
                  onChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;
