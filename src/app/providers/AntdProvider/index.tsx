import { App, ConfigProvider, theme } from "antd";
import type { AntdProviderProps } from "./types";

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#bf7a5a",
        colorLinkHover: "#bf7a5a",
        colorLinkActive: "#9d6347",
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
        Segmented: {
          trackBg: "#292524",
          itemColor: "#a8a29e",
          itemHoverColor: "#ffffff",
          itemHoverBg: "#57534e",
          itemSelectedBg: "#bf7a5a",
          itemSelectedColor: "#ffffff",
          itemActiveBg: "#44403c",
        },
      },
    }}
  >
    <App>{children}</App>
  </ConfigProvider>
);

export default AntdProvider;
