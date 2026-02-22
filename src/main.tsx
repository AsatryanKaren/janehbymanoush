import { createRoot } from "react-dom/client";
import App from "src/app/App";
import "src/i18n";
import "src/styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
