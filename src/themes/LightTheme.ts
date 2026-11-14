/* eslint-disable quotes */
import type { ColorFont, ColorSchema, Palette, Theme } from "themes/interfaces";
import { BaseBorder, BaseColor, BaseFont, BaseMargin } from "themes/base";
import { Enums } from "utils";

const theme: Theme = {
  id: Enums.EnumTheme.Light,
  font: BaseFont,
  color: {
    ...BaseColor,
    // High-contrast, vibrant cyan/azure for light mode (WCAG AA accessible against light backgrounds)
    accent: { color: "#0284C7", text: "#FFFFFF" } as ColorSchema,
  },
  palette: {
    // Ultra-clean frosted crystal glass surface with rich elevation
    theme: "rgba(255, 255, 255, 0.94)",
    // Crisp, defined structural hairline borders (solid 1px contrast against canvas)
    border: "rgba(15, 23, 42, 0.16)",
    input: {
      color: "rgba(241, 245, 249, 0.95)",
      accent: "rgba(226, 232, 240, 1)",
    } as ColorSchema,
    // Deep Midnight Slate-950 for razor-sharp typography contrast, Slate-600 for secondary
    font: {
      color: "#090D16",
      accent: "#475569",
    } as ColorFont,
    // Crisp atmospheric canvas background
    background: {
      color: "#F1F5F9",
      accent: "#E2E8F0",
    } as ColorSchema,
  } as Palette,
  border: BaseBorder,
  margin: BaseMargin,
};

export const Light = theme;

