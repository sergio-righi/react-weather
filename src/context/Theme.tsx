import React, { createContext, useContext } from "react";
import { Theme } from "themes/interfaces";
import { Light } from "themes";
import { Helpers } from "utils";

type ThemeProps = Theme & {
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeProps>({
  ...Light,
  setTheme: () => {},
});

interface Props {
  initTheme: Theme;
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>(
  ({ initTheme, children }: Props) => {
    const [theme, setTheme] = React.useState<ThemeProps>({
      ...initTheme,
    } as ThemeProps);

    const setThemeCallback = React.useCallback((newTheme: Theme) => {
      setTheme((currentTheme: Theme) =>
        Helpers.deepInterpolation(currentTheme, newTheme)
      );
    }, []);

    const MemoizedValue = React.useMemo(() => {
      const value: ThemeProps = {
        id: theme.id,
        border: theme.border,
        color: theme.color,
        font: theme.font,
        margin: theme.margin,
        palette: theme.palette,
        setTheme: setThemeCallback,
      };
      return value;
    }, [theme, setThemeCallback]);

    return (
      <ThemeContext.Provider value={MemoizedValue}>
        {children}
      </ThemeContext.Provider>
    );
  }
);

export const useTheme = () => useContext(ThemeContext);
