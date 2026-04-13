import { createBrowserRouter, Outlet } from "react-router-dom";
import { ROUTES } from "src/consts/routes";
import AdminAuthGuard from "src/app/AdminAuthGuard";
import AppLayout from "src/app/layout";
import CartProvider from "src/app/providers/CartProvider";
import AdminAuthProvider from "src/app/providers/AdminAuthProvider";
import HomePage from "src/pages/Home";
import CatalogPage from "src/pages/Catalog";
import ProductPage from "src/pages/Product";
import AboutPage from "src/pages/About";
import ContactPage from "src/pages/Contact";
import InfoPage from "src/pages/InfoPage";
import NotFoundPage from "src/pages/NotFound";
import AdminLoginPage from "src/pages/Admin/Login";
import AdminProductsListPage from "src/pages/Admin/Products/AdminProductsListPage";
import AdminProductEditPage from "src/pages/Admin/Products/AdminProductEditPage";
import AdminProductViewPage from "src/pages/Admin/Products/AdminProductViewPage";
import AdminOrdersPage from "src/pages/Admin/Orders/AdminOrdersPage";
import AdminOrderDetailPage from "src/pages/Admin/Orders/AdminOrderDetailPage";
import AdminCollectionsListPage from "src/pages/Admin/Collections/AdminCollectionsListPage";
import AdminCollectionEditPage from "src/pages/Admin/Collections/AdminCollectionEditPage";
import AdminCategoriesListPage from "src/pages/Admin/Categories/AdminCategoriesListPage";
import AdminCategoryEditPage from "src/pages/Admin/Categories/AdminCategoryEditPage";
import AdminBestsellersPage from "src/pages/Admin/Bestsellers/AdminBestsellersPage";
import AdminLogsPage from "src/pages/Admin/Logs/AdminLogsPage";
import AdminBannerContentPage from "src/pages/Admin/BannerContent/AdminBannerContentPage";
import AdminCatalogProvidersLayout from "src/app/AdminCatalogProvidersLayout";
import CheckoutPage from "src/pages/Checkout";

export const router = createBrowserRouter([
  {
    element: (
      <CartProvider>
        <AppLayout />
      </CartProvider>
    ),
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.CATALOG, element: <CatalogPage /> },
      { path: ROUTES.WOMEN, element: <CatalogPage /> },
      { path: ROUTES.MEN, element: <CatalogPage /> },
      { path: ROUTES.UNISEX, element: <CatalogPage /> },
      { path: ROUTES.NEW, element: <CatalogPage /> },
      { path: ROUTES.PRODUCT, element: <ProductPage /> },
      { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      {
        path: ROUTES.RING_SIZE_GUIDE,
        element: <InfoPage pageSlug="ring-size-guide" />,
      },
      { path: ROUTES.SHIPPING, element: <InfoPage pageSlug="shipping" /> },
      { path: ROUTES.RETURNS, element: <InfoPage pageSlug="returns" /> },
      { path: ROUTES.CARE, element: <InfoPage pageSlug="care" /> },
      {
        path: ROUTES.GIFT_CARDS,
        element: <InfoPage pageSlug="gift-cards" />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminAuthProvider>
        <Outlet />
      </AdminAuthProvider>
    ),
    children: [
      { path: "login", element: <AdminLoginPage /> },
      {
        element: <AdminAuthGuard />,
        children: [
          { path: "orders", element: <AdminOrdersPage /> },
          { path: "order/:id", element: <AdminOrderDetailPage /> },
          { path: "bestsellers", element: <AdminBestsellersPage /> },
          { path: "logs", element: <AdminLogsPage /> },
          { path: "banner-content", element: <AdminBannerContentPage /> },
          {
            element: <AdminCatalogProvidersLayout />,
            children: [
              { path: "products", element: <AdminProductsListPage /> },
              { path: "products/new", element: <AdminProductEditPage /> },
              { path: "products/:id", element: <AdminProductViewPage /> },
              { path: "products/:id/edit", element: <AdminProductEditPage /> },
              { path: "collections", element: <AdminCollectionsListPage /> },
              { path: "collections/new", element: <AdminCollectionEditPage /> },
              {
                path: "collections/:id/edit",
                element: <AdminCollectionEditPage />,
              },
              { path: "categories", element: <AdminCategoriesListPage /> },
              { path: "categories/new", element: <AdminCategoryEditPage /> },
              {
                path: "categories/:id/edit",
                element: <AdminCategoryEditPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
