import React, { createContext, useContext } from "react";
import { Theme } from "themes/interfaces";
import { Dark, Light } from "themes";
import { HObject } from "helpers";

type ThemeProps = Theme & {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeProps>({
  ...Light,
  setTheme: () => {},
  toggleTheme: () => {},
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
        HObject.deepInterpolation(currentTheme, newTheme)
      );
    }, []);

    const toggleThemeCallback = React.useCallback(() => {
      setTheme((currentTheme: Theme) =>
        currentTheme.id === Dark.id
          ? HObject.deepInterpolation(currentTheme, Light)
          : HObject.deepInterpolation(currentTheme, Dark)
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
        toggleTheme: toggleThemeCallback,
      };
      return value;
    }, [theme, setThemeCallback, toggleThemeCallback]);

    return (
      <ThemeContext.Provider value={MemoizedValue}>
        {children}
      </ThemeContext.Provider>
    );
  }
);

export const useTheme = () => useContext(ThemeContext);
