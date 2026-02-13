import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/consts/routes";
import { AppLayout } from "@/app/layout/AppLayout";
import { HomePage } from "@/pages/Home/HomePage";
import { CatalogPage } from "@/pages/Catalog/CatalogPage";
import { ProductPage } from "@/pages/Product/ProductPage";
import { AboutPage } from "@/pages/About/AboutPage";
import { ContactPage } from "@/pages/Contact/ContactPage";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";
import { AdminLayout } from "@/pages/Admin/AdminLayout";
import { AdminProductsListPage } from "@/pages/Admin/Products/AdminProductsListPage";
import { AdminProductEditPage } from "@/pages/Admin/Products/AdminProductEditPage";
import { AdminOrdersPage } from "@/pages/Admin/Orders/AdminOrdersPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
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
      { path: ROUTES.ADMIN_PRODUCT_EDIT, element: <AdminProductEditPage /> },
      { path: ROUTES.ADMIN_ORDERS, element: <AdminOrdersPage /> },
    ],
  },
]);
