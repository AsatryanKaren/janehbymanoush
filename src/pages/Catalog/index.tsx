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
  CATALOG_PAGE_URL_PARAM,
  CATALOG_PRICE_MAX,
  CATALOG_PRICE_MIN,
  CATALOG_PRICE_MAX_URL_PARAM,
  CATALOG_PRICE_MIN_URL_PARAM,
  CATALOG_SEARCH_URL_PARAM,
  isCatalogDefaultPriceRange,
  TITLE_KEY_MAP,
  SORT_PARAMS,
  parseCatalogPageFromSearchParams,
  parseCatalogPriceRangeFromSearchParams,
  parseCatalogSearchFromSearchParams,
  MOBILE_CATALOG_COLLECTIONS_INITIAL,
  MOBILE_CATALOG_SIDEBAR_MAX_WIDTH_PX,
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

const mergeCatalogPageIntoParams = (
  prev: URLSearchParams,
  pageNum: number,
): URLSearchParams => {
  const next = new URLSearchParams(prev);
  if (pageNum <= 1) next.delete(CATALOG_PAGE_URL_PARAM);
  else next.set(CATALOG_PAGE_URL_PARAM, String(pageNum));
  return next;
};

/** Reset to page 1 and set or clear the search term in the URL. */
const mergeCatalogPageAndSearchIntoParams = (
  prev: URLSearchParams,
  searchQuery: string,
): URLSearchParams => {
  const next = mergeCatalogPageIntoParams(prev, 1);
  const trimmed = searchQuery.trim();
  if (trimmed) next.set(CATALOG_SEARCH_URL_PARAM, trimmed);
  else next.delete(CATALOG_SEARCH_URL_PARAM);
  return next;
};

/** Reset to page 1 and set or clear `minPrice` / `maxPrice` in the URL. */
const mergeCatalogPageAndPriceIntoParams = (
  prev: URLSearchParams,
  range: [number, number],
): URLSearchParams => {
  const next = mergeCatalogPageIntoParams(prev, 1);
  if (isCatalogDefaultPriceRange(range)) {
    next.delete(CATALOG_PRICE_MIN_URL_PARAM);
    next.delete(CATALOG_PRICE_MAX_URL_PARAM);
  } else {
    next.set(CATALOG_PRICE_MIN_URL_PARAM, String(range[0]));
    next.set(CATALOG_PRICE_MAX_URL_PARAM, String(range[1]));
  }
  return next;
};

const CatalogPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = useMemo(
    () => parseCatalogPageFromSearchParams(searchParams),
    [searchParams],
  );
  const urlSearch = useMemo(
    () => parseCatalogSearchFromSearchParams(searchParams),
    [searchParams],
  );
  const urlPriceRange = useMemo(
    () => parseCatalogPriceRangeFromSearchParams(searchParams),
    [searchParams],
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<AdminCollectionItem[]>([]);
  const [filterValue, setFilterValue] = useState<string | undefined>(() => {
    const collectionId = searchParams.get("collection");
    return collectionId ? catalogCollectionFilterValue(collectionId) : undefined;
  });
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());
  const [isMobileCatalogSidebar, setIsMobileCatalogSidebar] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(max-width: ${MOBILE_CATALOG_SIDEBAR_MAX_WIDTH_PX}px)`).matches,
  );
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(false);
  const catalogPageRef = useRef(urlPage);
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [appliedSearch, setAppliedSearch] = useState(urlSearch);

  useEffect(() => {
    setSearchInput(urlSearch);
    setAppliedSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    if (catalogPageRef.current !== urlPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      catalogPageRef.current = urlPage;
    }
  }, [urlPage]);

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
  const [priceRange, setPriceRange] = useState<[number, number]>(urlPriceRange);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>(urlPriceRange);

  useEffect(() => {
    setPriceRange(urlPriceRange);
    setAppliedPriceRange(urlPriceRange);
  }, [urlPriceRange]);

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
    const mq = window.matchMedia(
      `(max-width: ${MOBILE_CATALOG_SIDEBAR_MAX_WIDTH_PX}px)`,
    );
    const sync = (): void => {
      setIsMobileCatalogSidebar(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobileCatalogSidebar) setMobileCollectionsExpanded(false);
  }, [isMobileCatalogSidebar]);

  const collectionsForSidebar = useMemo(() => {
    if (
      !isMobileCatalogSidebar ||
      mobileCollectionsExpanded ||
      collections.length <= MOBILE_CATALOG_COLLECTIONS_INITIAL
    ) {
      return collections;
    }
    return collections.slice(0, MOBILE_CATALOG_COLLECTIONS_INITIAL);
  }, [
    collections,
    isMobileCatalogSidebar,
    mobileCollectionsExpanded,
  ]);

  const showMobileCollectionsToggle =
    isMobileCatalogSidebar && collections.length > MOBILE_CATALOG_COLLECTIONS_INITIAL;

  /** Collapse "show more" on mobile when page, section, query filters, or sort change. */
  const mobileCatalogListSignature = useMemo(
    () => `${location.pathname}|${searchParams.toString()}|${sort}`,
    [location.pathname, searchParams, sort],
  );

  useEffect(() => {
    setMobileCollectionsExpanded(false);
  }, [mobileCatalogListSignature]);

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
    params.Page = String(urlPage);
    params.PageSize = String(CATALOG_PAGE_SIZE);
    productsApi
      .getAll(params)
      .then((res) => {
        setProducts(res.items ?? []);
        const resolvedTotal = res.total ?? res.items?.length ?? 0;
        setTotal(resolvedTotal);
        const resolvedPage = res.page ?? urlPage;
        const maxPage = Math.max(1, Math.ceil(resolvedTotal / CATALOG_PAGE_SIZE));
        const clampedPage = Math.min(Math.max(1, resolvedPage), maxPage);
        if (clampedPage !== urlPage) {
          setSearchParams(
            (prev) => mergeCatalogPageIntoParams(prev, clampedPage),
            { replace: true },
          );
        }
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
    urlPage,
    appliedPriceRange,
    appliedSearch,
    setSearchParams,
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
      if (kind === "section") {
        navigate(ROUTES.CATALOG);
        return;
      }
      if (kind === "search") {
        setAppliedSearch("");
        setSearchInput("");
        setSearchParams(
          (prev) => mergeCatalogPageAndSearchIntoParams(prev, ""),
          { replace: true },
        );
        return;
      }
      if (kind === "price") {
        setPriceRange([CATALOG_PRICE_MIN, CATALOG_PRICE_MAX]);
        setAppliedPriceRange([CATALOG_PRICE_MIN, CATALOG_PRICE_MAX]);
        setSearchParams(
          (prev) =>
            mergeCatalogPageAndPriceIntoParams(prev, [
              CATALOG_PRICE_MIN,
              CATALOG_PRICE_MAX,
            ]),
          { replace: true },
        );
        return;
      }
      setSearchParams((prev) => mergeCatalogPageIntoParams(prev, 1), { replace: true });
      switch (kind) {
        case "collection":
        case "category":
          setFilterValue(undefined);
          break;
      }
    },
    [navigate, setSearchParams],
  );

  const clearAllFilters = useCallback(() => {
    navigate({ pathname: ROUTES.CATALOG, search: "" }, { replace: true });
    setFilterValue(undefined);
    setAppliedSearch("");
    setSearchInput("");
    setPriceRange([CATALOG_PRICE_MIN, CATALOG_PRICE_MAX]);
    setAppliedPriceRange([CATALOG_PRICE_MIN, CATALOG_PRICE_MAX]);
    setSort("price_asc");
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
                    setSearchParams(
                      (prev) => mergeCatalogPageAndSearchIntoParams(prev, ""),
                      { replace: true },
                    );
                  }
                }}
                onSearch={(val) => {
                  setAppliedSearch(val);
                  setSearchParams(
                    (prev) => mergeCatalogPageAndSearchIntoParams(prev, val),
                    { replace: true },
                  );
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
                    setSearchParams(
                      (prev) => mergeCatalogPageAndPriceIntoParams(prev, next),
                      { replace: true },
                    );
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
                {collectionsForSidebar.map((col) => {
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
                            setSearchParams((prev) => mergeCatalogPageIntoParams(prev, 1), {
                              replace: true,
                            });
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
                                    setSearchParams((prev) => mergeCatalogPageIntoParams(prev, 1), {
                                      replace: true,
                                    });
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
              {showMobileCollectionsToggle && (
                <Button
                  type="link"
                  className={styles.collectionsMoreToggle}
                  onClick={() => setMobileCollectionsExpanded((v) => !v)}
                >
                  {mobileCollectionsExpanded
                    ? t("catalog.showLess")
                    : t("catalog.showMore")}
                </Button>
              )}
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
                  setSearchParams((prev) => mergeCatalogPageIntoParams(prev, 1), {
                    replace: true,
                  });
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    catalogReturnLocation={`${location.pathname}${location.search}`}
                  />
                ))}
              </CardGrid>
            </div>
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Pagination
                  current={urlPage}
                  total={total}
                  pageSize={CATALOG_PAGE_SIZE}
                  showSizeChanger={false}
                  onChange={(p) => setSearchParams((prev) => mergeCatalogPageIntoParams(prev, p))}
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
