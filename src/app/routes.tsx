import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "src/consts/routes";
import AppLayout from "src/app/layout";
import HomePage from "src/pages/Home";
import CatalogPage from "src/pages/Catalog";
import ProductPage from "src/pages/Product";
import AboutPage from "src/pages/About";
import ContactPage from "src/pages/Contact";
import NotFoundPage from "src/pages/NotFound";
import AdminLayout from "src/pages/Admin";
import AdminProductsListPage from "src/pages/Admin/Products/AdminProductsListPage";
import AdminProductEditPage from "src/pages/Admin/Products/AdminProductEditPage";
import AdminProductViewPage from "src/pages/Admin/Products/AdminProductViewPage";
import AdminOrdersPage from "src/pages/Admin/Orders/AdminOrdersPage";
import AdminCollectionsListPage from "src/pages/Admin/Collections/AdminCollectionsListPage";
import AdminCollectionEditPage from "src/pages/Admin/Collections/AdminCollectionEditPage";
import AdminCategoriesListPage from "src/pages/Admin/Categories/AdminCategoriesListPage";
import AdminCategoryEditPage from "src/pages/Admin/Categories/AdminCategoryEditPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.CATALOG, element: <CatalogPage /> },
      { path: ROUTES.WOMEN, element: <CatalogPage /> },
      { path: ROUTES.MEN, element: <CatalogPage /> },
      { path: ROUTES.PRODUCT, element: <ProductPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: ROUTES.ADMIN_PRODUCTS, element: <AdminProductsListPage /> },
      { path: ROUTES.ADMIN_PRODUCT_NEW, element: <AdminProductEditPage /> },
      { path: ROUTES.ADMIN_PRODUCT_VIEW, element: <AdminProductViewPage /> },
      { path: ROUTES.ADMIN_PRODUCT_EDIT, element: <AdminProductEditPage /> },
      { path: ROUTES.ADMIN_COLLECTIONS, element: <AdminCollectionsListPage /> },
      { path: ROUTES.ADMIN_COLLECTION_NEW, element: <AdminCollectionEditPage /> },
      { path: ROUTES.ADMIN_COLLECTION_EDIT, element: <AdminCollectionEditPage /> },
      { path: ROUTES.ADMIN_CATEGORIES, element: <AdminCategoriesListPage /> },
      { path: ROUTES.ADMIN_CATEGORY_NEW, element: <AdminCategoryEditPage /> },
      { path: ROUTES.ADMIN_CATEGORY_EDIT, element: <AdminCategoryEditPage /> },
      { path: ROUTES.ADMIN_ORDERS, element: <AdminOrdersPage /> },
    ],
  },
]);
