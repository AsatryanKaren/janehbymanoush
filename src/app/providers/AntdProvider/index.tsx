import { App, ConfigProvider, theme } from "antd";
import type { AntdProviderProps } from "./types";

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#8b6914",
        borderRadius: 6,
        fontFamily: "var(--app-font-family)",
      },
      algorithm: theme.defaultAlgorithm,
      components: {
        Layout: {
          headerBg: "#fff",
          headerPadding: "0 24px",
          footerBg: "#fafafa",
          siderBg: "#001529",
        },
        Menu: {
          horizontalLineHeight: "64px",
        },
      },
    }}
  >
    <App>{children}</App>
  </ConfigProvider>
);

export default AntdProvider;
