import { Outlet } from "react-router-dom";
import AdminCategoriesProvider from "src/app/providers/AdminCategoriesProvider";
import AdminCollectionsProvider from "src/app/providers/AdminCollectionsProvider";

/** Categories + collections context for product/category/collection admin routes only. */
const AdminCatalogProvidersLayout: React.FC = () => (
  <AdminCategoriesProvider>
    <AdminCollectionsProvider>
      <Outlet />
    </AdminCollectionsProvider>
  </AdminCategoriesProvider>
);

export default AdminCatalogProvidersLayout;
