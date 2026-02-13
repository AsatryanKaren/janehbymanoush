import { RouterProvider } from "react-router-dom";
import { AntdProvider } from "@/app/providers/AntdProvider";
import { router } from "@/app/routes";

export const App: React.FC = () => (
  <AntdProvider>
    <RouterProvider router={router} />
  </AntdProvider>
);
