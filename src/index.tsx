import "./index.scss";

import ReactDOM from "react-dom/client";
import Routers from "router";
import { AppProvider, ThemeProvider, ServiceProvider } from "contexts";
import { Dark } from "themes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AppProvider initLocale={"EN"}>
    <ThemeProvider initTheme={Dark}>
      <ServiceProvider>
        <Routers />
      </ServiceProvider>
    </ThemeProvider>
  </AppProvider>
);
