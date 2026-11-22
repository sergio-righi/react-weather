/* eslint-disable quotes */
import type { ColorFont, ColorSchema, Palette, Theme } from "themes/interfaces";
import { BaseBorder, BaseColor, BaseFont, BaseSpacing } from "themes/base";
import { Enums } from "utils";

// Nature Distilled: Dark Theme (Deep Loam Soil #191411, Rich Terracotta #C67B5C, Bark #8B4513, Sand Linen #D4C4A8)
const theme: Theme = {
  id: Enums.EnumTheme.Dark,
  font: BaseFont,
  color: BaseColor,
  palette: {
    // Rich earthy clay / dark wood surface
    theme: "rgba(35, 27, 23, 0.85)",
    // Subtle sand/clay edge border
    border: "rgba(212, 196, 168, 0.16)",
    input: {
      color: "rgba(212, 196, 168, 0.08)",
      accent: "rgba(212, 196, 168, 0.18)",
    } as ColorSchema,
    // Warm sand / linen text for WCAG AA readability, warm mineral secondary
    font: {
      color: "#F5F0E1",
      accent: "#B8A793",
    } as ColorFont,
    // Deep nocturnal earth & soil background
    background: {
      color: "#181310",
      accent: "#241D18",
    } as ColorSchema,
  } as Palette,
  border: BaseBorder,
  spacing: BaseSpacing,
};

export const Dark = theme;

