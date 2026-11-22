/* eslint-disable quotes */
import type { ColorFont, ColorSchema, Palette, Theme } from "themes/interfaces";
import { BaseBorder, BaseColor, BaseFont, BaseSpacing } from "themes/base";
import { Enums } from "utils";

// Nature Distilled: Light Theme (Linen, Warm Parchment #F5F0E1, Terracotta #C67B5C, Deep Soil #2D241E)
const theme: Theme = {
  id: Enums.EnumTheme.Light,
  font: BaseFont,
  color: {
    ...BaseColor,
    // Terracotta accent with strong WCAG AA contrast against warm backgrounds
    accent: { color: "#B35B3A", text: "#FFFFFF" } as ColorSchema,
  },
  palette: {
    // Warm handmade paper / linen surface
    theme: "rgba(245, 240, 225, 0.92)",
    // Organic clay / sandstone hairline border
    border: "rgba(139, 69, 19, 0.18)",
    input: {
      color: "rgba(253, 251, 247, 0.95)",
      accent: "#D4C4A8",
    } as ColorSchema,
    // Deep earth/charcoal font for 100% WCAG AA compliance (4.5:1+), warm mineral secondary
    font: {
      color: "#241B16",
      accent: "#5C4F44",
    } as ColorFont,
    // Warm linen / parchment canvas
    background: {
      color: "#F5F0E1",
      accent: "#EAE2CF",
    } as ColorSchema,
  } as Palette,
  border: BaseBorder,
  spacing: BaseSpacing,
};

export const Light = theme;


