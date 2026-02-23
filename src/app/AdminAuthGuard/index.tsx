import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "src/app/providers/AdminAuthProvider";
import { ROUTES } from "src/consts/routes";
import AdminLayout from "src/pages/Admin";

/**
 * Protects admin routes: redirects to admin login if not authenticated.
 */
const AdminAuthGuard: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminAuthGuard;
