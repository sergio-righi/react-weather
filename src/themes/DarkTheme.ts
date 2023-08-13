/* eslint-disable quotes */
import type { ColorFont, ColorSchema, Palette, Theme } from "themes/interfaces";
import { BaseBorder, BaseColor, BaseFont, BaseMargin } from "themes/base";
import { Enums } from "utils";

const theme: Theme = {
  id: Enums.EnumTheme.Dark,
  font: BaseFont,
  color: BaseColor,
  palette: {
    theme: "#242424",
    border: "#404040",
    input: { color: "#f5f5f5", accent: "#dbdbdb" } as ColorSchema,
    font: { color: "#ffffff", accent: "#a9acb3" } as ColorFont,
    background: { color: "#242424", accent: "#202020" } as ColorSchema
  } as Palette,
  border: BaseBorder,
  margin: BaseMargin,
};

export const Dark = theme;
