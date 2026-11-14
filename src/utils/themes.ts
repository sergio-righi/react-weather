import { Theme } from 'themes/interfaces';
import { createTheme } from '@mui/material/styles';
import { Enums } from 'utils';

export const defaultTheme = (theme: Theme) => {
  const isDark = theme.id === Enums.EnumTheme.Dark;

  return createTheme({
    direction: "ltr",
    palette: {
      mode: isDark ? "dark" : "light",
      common: {
        black: theme.color.black,
        white: theme.color.white
      },
      primary: {
        main: theme.color.accent.color,
        contrastText: theme.color.accent.text
      },
      error: {
        main: theme.color.status.error.color,
        contrastText: theme.color.status.error.text
      },
      warning: {
        main: theme.color.status.warning.color,
        contrastText: theme.color.status.warning.text
      },
      success: {
        main: theme.color.status.success.color,
        contrastText: theme.color.status.success.text
      },
      text: {
        primary: theme.palette.font.color,
        secondary: theme.palette.font.accent,
      },
      divider: theme.palette.border,
      background: {
        default: theme.palette.background.color,
        paper: theme.palette.theme,
      }
    },
    shape: {
      borderRadius: theme.border.radius * theme.border.factor,
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "3.5rem",
        lineHeight: 1.1,
        letterSpacing: "-0.025em"
      },
      h2: {
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "2.5rem",
        lineHeight: 1.15,
        letterSpacing: "-0.02em"
      },
      h3: {
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "1.75rem",
        lineHeight: 1.2,
        letterSpacing: "-0.015em"
      },
      h4: {
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.3,
        letterSpacing: "-0.01em"
      },
      h5: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1.4,
        letterSpacing: "0em"
      },
      h6: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1.45,
        letterSpacing: "0.01em"
      },
      body1: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: "0.9375rem",
        lineHeight: 1.5,
      },
      body2: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: "0.8125rem",
        lineHeight: 1.5,
      },
      button: {
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        fontWeight: 600,
        textTransform: "none",
        letterSpacing: "0.01em"
      }
    }
  });
};
