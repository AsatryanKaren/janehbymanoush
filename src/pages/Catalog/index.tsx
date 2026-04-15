import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import { Spin, Typography, Flex, Pagination, Slider, Input, Tag, Button } from "antd";
import { ClearOutlined, PlusOutlined } from "@ant-design/icons";
import DarkSelect from "src/components/DarkSelect";
import { useTranslation } from "react-i18next";
import ProductCard from "src/components/ProductCard";
import CardGrid from "src/components/CardGrid";
import CatalogEmptyState from "src/components/CatalogEmptyState";
import { productsApi } from "src/api/products";
import { collectionsApi } from "src/api/collections";
import type { Product } from "src/types/product";
import type { AdminCollectionItem } from "src/types/collection";
import { ROUTES } from "src/consts/routes";
import { formatPrice } from "src/utils/formatPrice";
import {
  CATEGORY_MAP,
  CATALOG_PAGE_SIZE,
  CATALOG_PRICE_MAX,
  CATALOG_PRICE_MIN,
  isCatalogDefaultPriceRange,
  TITLE_KEY_MAP,
  SORT_PARAMS,
  type SortValue,
} from "./consts";
import type { ActiveFilterKind, ActiveFilterTag } from "./types";
import {
  catalogCategoryFilterValue,
  catalogCollectionFilterValue,
  findCategoryInCollections,
  getCatalogSelectionIds,
  getCategoryTitle,
  getCollectionTitle,
} from "./utils";
import styles from "./styles.module.css";

const { Title } = Typography;

const CatalogPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<AdminCollectionItem[]>([]);
  const [filterValue, setFilterValue] = useState<string | undefined>(() => {
    const collectionId = searchParams.get("collection");
    return collectionId ? catalogCollectionFilterValue(collectionId) : undefined;
  });
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const catalogPageRef = useRef(page);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  useEffect(() => {
    if (catalogPageRef.current !== page) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      catalogPageRef.current = page;
    }
  }, [page]);

  const toggleCollapse = (colId: string) => {
    setExpandedCollections((prev) => {
      const next = new Set(prev);
      if (next.has(colId)) next.delete(colId);
      else next.add(colId);
      return next;
    });
  };

  const { collectionId: selectedCollectionId, categoryId: selectedCategoryId } =
    getCatalogSelectionIds(filterValue);

  const [sort, setSort] = useState<SortValue>("price_asc");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    CATALOG_PRICE_MIN,
    CATALOG_PRICE_MAX,
  ]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    CATALOG_PRICE_MIN,
    CATALOG_PRICE_MAX,
  ]);

  const pathCategory = CATEGORY_MAP[location.pathname];
  const pathIsNew = location.pathname === ROUTES.NEW;
  const titleKey = TITLE_KEY_MAP[location.pathname] ?? "catalog.catalog";

  useEffect(() => {
    void collectionsApi
      .getAll()
      .then((res) => setCollections(res.items ?? []))
      .catch(() => setCollections([]));
  }, []);

  useEffect(() => {
    const { collectionId } = getCatalogSelectionIds(filterValue);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (collectionId) next.set("collection", collectionId);
        else next.delete("collection");
        return next;
      },
      { replace: true },
    );
  }, [filterValue, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (pathCategory) params.Gender = pathCategory;
    if (selectedCategoryId) params.CategoryId = selectedCategoryId;
    if (selectedCollectionId) params.CollectionId = selectedCollectionId;
    if (pathIsNew) params.New = "true";
    if (appliedSearch.trim()) params.Search = appliedSearch.trim();
    params.MinPrice = String(appliedPriceRange[0]);
    params.MaxPrice = String(appliedPriceRange[1]);
    const { SortBy, SortOrder } = SORT_PARAMS[sort];
    params.SortBy = SortBy;
    params.SortOrder = SortOrder;
    params.Page = String(page);
    params.PageSize = String(CATALOG_PAGE_SIZE);
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
  }, [
    pathCategory,
    pathIsNew,
    filterValue,
    sort,
    page,
    appliedPriceRange,
    appliedSearch,
  ]);

  const totalPages = Math.max(1, Math.ceil(total / CATALOG_PAGE_SIZE));

  const activeFilterTags = useMemo((): ActiveFilterTag[] => {
    const tags: ActiveFilterTag[] = [];
    if (location.pathname !== ROUTES.CATALOG) {
      let sectionLabel = "";
      if (pathIsNew) sectionLabel = t("nav.new");
      else if (location.pathname === ROUTES.WOMEN) sectionLabel = t("nav.woman");
      else if (location.pathname === ROUTES.MEN) sectionLabel = t("nav.man");
      else if (location.pathname === ROUTES.UNISEX) sectionLabel = t("nav.unisex");
      if (sectionLabel) tags.push({ key: "section", kind: "section", label: sectionLabel });
    }
    if (selectedCollectionId) {
      const col = collections.find((c) => c.id === selectedCollectionId);
      tags.push({
        key: catalogCollectionFilterValue(selectedCollectionId),
        kind: "collection",
        label: col
          ? getCollectionTitle(col, i18n.language)
          : t("catalog.activeFilters.collectionFallback"),
      });
    } else if (selectedCategoryId) {
      const cat = findCategoryInCollections(collections, selectedCategoryId);
      tags.push({
        key: catalogCategoryFilterValue(selectedCategoryId),
        kind: "category",
        label: cat
          ? getCategoryTitle(cat, i18n.language)
          : t("catalog.activeFilters.categoryFallback"),
      });
    }
    const q = appliedSearch.trim();
    if (q) tags.push({ key: "search", kind: "search", label: q });
    if (!isCatalogDefaultPriceRange(appliedPriceRange)) {
      tags.push({
        key: "price",
        kind: "price",
        label: t("catalog.activeFilters.price", {
          min: formatPrice(appliedPriceRange[0], "AMD", i18n.language),
          max: formatPrice(appliedPriceRange[1], "AMD", i18n.language),
        }),
      });
    }
    return tags;
  }, [
    appliedPriceRange,
    appliedSearch,
    collections,
    i18n.language,
    location.pathname,
    pathIsNew,
    selectedCategoryId,
    selectedCollectionId,
    t,
  ]);

  const removeActiveFilter = useCallback(
    (kind: ActiveFilterKind) => {
      setPage(1);
      switch (kind) {
        case "section":
          navigate(ROUTES.CATALOG);
          break;
        case "search":
          setAppliedSearch("");
          setSearchInput("");
          break;
        case "price":
          setPriceRange([CATALOG_PRICE_MIN, CATALOG_PRICE_MAX]);
          setAppliedPriceRange([CATALOG_PRICE_MIN, CATALOG_PRICE_MAX]);
          break;
        case "collection":
        case "category":
          setFilterValue(undefined);
          break;
      }
    },
    [navigate],
  );

  const clearAllFilters = useCallback(() => {
    navigate(ROUTES.CATALOG);
    setFilterValue(undefined);
    setAppliedSearch("");
    setSearchInput("");
    setPriceRange([CATALOG_PRICE_MIN, CATALOG_PRICE_MAX]);
    setAppliedPriceRange([CATALOG_PRICE_MIN, CATALOG_PRICE_MAX]);
    setSort("price_asc");
    setPage(1);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <div className={styles.sidebarTop}>
            <div className={`${styles.sidebarSection} ${styles.filtersSection}`}>
              <span className={styles.sectionTitle}>{t("catalog.sections.filters")}</span>
              <Input.Search
                placeholder={t("catalog.searchPlaceholder")}
                value={searchInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setSearchInput(v);
                  if (v === "") {
                    setAppliedSearch("");
                    setPage(1);
                  }
                }}
                onSearch={(val) => {
                  setAppliedSearch(val);
                  setPage(1);
                }}
                allowClear
                className={styles.searchInput}
              />
              <div className={styles.filterLinks}>
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
                  to={ROUTES.NEW}
                  className={
                    location.pathname === ROUTES.NEW
                      ? styles.categoryLinkActive
                      : styles.categoryLink
                  }
                >
                  {t("nav.new")}
                </Link>
                <Link
                  to={ROUTES.WOMEN}
                  className={
                    location.pathname === ROUTES.WOMEN
                      ? styles.categoryLinkActive
                      : styles.categoryLink
                  }
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
                >
                  {t("nav.man")}
                </Link>
                <Link
                  to={ROUTES.UNISEX}
                  className={
                    location.pathname === ROUTES.UNISEX
                      ? styles.categoryLinkActive
                      : styles.categoryLink
                  }
                >
                  {t("nav.unisex")}
                </Link>
              </div>
              <div className={styles.priceRangeWrap}>
                <span className={styles.priceRangeLabel}>{t("catalog.priceRange")}</span>
                <Slider
                  range
                  min={CATALOG_PRICE_MIN}
                  max={CATALOG_PRICE_MAX}
                  value={priceRange}
                  onChange={(v) => setPriceRange(v as [number, number])}
                  onAfterChange={(v) => {
                    const next = v as [number, number];
                    setAppliedPriceRange(next);
                    setPage(1);
                  }}
                  className={styles.priceRangeSlider}
                />
                <span className={styles.priceRangeValue}>
                  {formatPrice(priceRange[0], "AMD", i18n.language)} –{" "}
                  {formatPrice(priceRange[1], "AMD", i18n.language)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.collectionsScroll}>
            <div className={`${styles.sidebarSection} ${styles.collectionsSection}`}>
              <span className={styles.sectionTitle}>
                {t("catalog.sections.collections")}
              </span>
              <ul className={styles.categoryList}>
                {collections.map((col) => {
                  const hasChildren = (col.categories ?? []).length > 0;
                  const isOpen = expandedCollections.has(col.id);
                  const colFilterValue = catalogCollectionFilterValue(col.id);
                  const isColActive = filterValue === colFilterValue;

                  return (
                    <li key={col.id} className={styles.treeGroup}>
                      <Flex align="center" gap={6} className={styles.treeGroupRow}>
                        {hasChildren && (
                          <PlusOutlined
                            className={`${styles.toggleIcon} ${isOpen ? styles.toggleIconOpen : ""}`}
                            onClick={() => toggleCollapse(col.id)}
                          />
                        )}
                        <a
                          href="#"
                          className={
                            isColActive ? styles.categoryLinkActive : styles.categoryLink
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setFilterValue(isColActive ? undefined : colFilterValue);
                            if (!isOpen && hasChildren) toggleCollapse(col.id);
                            setPage(1);
                          }}
                        >
                          {getCollectionTitle(col, i18n.language)}
                        </a>
                      </Flex>
                      {hasChildren && isOpen && (
                        <ul className={styles.treeChildren}>
                          {(col.categories ?? []).map((cat) => {
                            const catFilterValue = catalogCategoryFilterValue(cat.id);
                            return (
                              <li key={cat.id} className={styles.categoryItem}>
                                <a
                                  href="#"
                                  className={
                                    filterValue === catFilterValue
                                      ? styles.categoryLinkActive
                                      : styles.categoryLink
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setFilterValue(
                                      filterValue === catFilterValue
                                        ? undefined
                                        : catFilterValue,
                                    );
                                    setPage(1);
                                  }}
                                >
                                  {getCategoryTitle(cat, i18n.language)}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.mainTop}>
          <div className={styles.headerRow}>
            <div className={styles.titleBlock}>
              <Title level={1} className={styles.title}>
                {t(titleKey)}
              </Title>
            </div>
            <div className={styles.sortWrap}>
              <span className={styles.sortLabel}>{t("catalog.sortBy")}</span>
              <DarkSelect<SortValue>
                value={sort}
                onChange={(v) => {
                  setSort(v);
                  setPage(1);
                }}
                style={{ width: 200 }}
                options={[
                  { value: "price_asc", label: t("catalog.sort.priceLowToHigh") },
                  { value: "price_desc", label: t("catalog.sort.priceHighToLow") },
                  { value: "date_desc", label: t("catalog.sort.dateNewToOld") },
                  { value: "date_asc", label: t("catalog.sort.dateOldToNew") },
                ]}
              />
            </div>
          </div>
          {activeFilterTags.length > 0 && (
            <Flex wrap="wrap" gap={8} align="center" className={styles.activeFilters}>
              {activeFilterTags.map((item) => (
                <Tag
                  key={item.key}
                  closable
                  className={styles.filterTag}
                  onClose={() => removeActiveFilter(item.kind)}
                >
                  {item.label}
                </Tag>
              ))}
              <Button
                type="link"
                size="small"
                className={styles.clearAllLink}
                icon={<ClearOutlined className={styles.clearAllIcon} />}
                onClick={clearAllFilters}
              >
                {t("catalog.activeFilters.clearAll")}
              </Button>
            </Flex>
          )}
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
                  pageSize={CATALOG_PAGE_SIZE}
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
