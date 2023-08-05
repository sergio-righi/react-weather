import "./index.scss";

import ReactDOM from "react-dom/client";
import Routers from "router";
import { AppProvider, ThemeProvider, ServiceProvider } from "context";
import { Light } from "themes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// document.documentElement.setAttribute("theme", "dark");

root.render(
  // <React.StrictMode>
  <AppProvider initLocale={"EN"}>
    <ThemeProvider initTheme={Light}>
      <ServiceProvider>
        <Routers />
      </ServiceProvider>
    </ThemeProvider>
  </AppProvider>
  // </React.StrictMode>
);
