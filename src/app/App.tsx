import { RouterProvider } from "react-router-dom";
import AntdProvider from "src/app/providers/AntdProvider";
import { router } from "src/app/routes";

const App: React.FC = () => (
  <AntdProvider>
    <RouterProvider router={router} />
  </AntdProvider>
);

export default App;
