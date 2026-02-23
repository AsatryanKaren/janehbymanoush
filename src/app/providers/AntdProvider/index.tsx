import { App, ConfigProvider, theme } from "antd";
import type { AntdProviderProps } from "./types";

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#bf7a5a",
        borderRadius: 6,
        fontFamily: "var(--app-font-family)",
      },
      algorithm: theme.defaultAlgorithm,
      components: {
        Layout: {
          headerBg: "transparent",
          headerPadding: "0 24px",
          footerBg: "transparent",
          siderBg: "#1d1715",
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
