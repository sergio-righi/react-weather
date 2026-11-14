/* eslint-disable quotes */
import type { ColorFont, ColorSchema, Palette, Theme } from "themes/interfaces";
import { BaseBorder, BaseColor, BaseFont, BaseMargin } from "themes/base";
import { Enums } from "utils";

const theme: Theme = {
  id: Enums.EnumTheme.Dark,
  font: BaseFont,
  color: BaseColor,
  palette: {
    theme: "rgba(15, 23, 42, 0.72)",
    border: "rgba(255, 255, 255, 0.09)",
    input: { color: "rgba(255, 255, 255, 0.06)", accent: "rgba(255, 255, 255, 0.12)" } as ColorSchema,
    font: { color: "#F8FAFC", accent: "#94A3B8" } as ColorFont,
    background: { color: "#080C14", accent: "#0F172A" } as ColorSchema
  } as Palette,
  border: BaseBorder,
  margin: BaseMargin,
};

export const Dark = theme;
