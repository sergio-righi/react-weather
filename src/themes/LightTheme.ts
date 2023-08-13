/* eslint-disable quotes */
import type { ColorFont, ColorSchema, Palette, Theme } from "themes/interfaces";
import { BaseBorder, BaseColor, BaseFont, BaseMargin } from "themes/base";
import { Enums } from "utils";

const theme: Theme = {
  id: Enums.EnumTheme.Light,
  font: BaseFont,
  color: BaseColor,
  palette: {
    theme: "#FFFFFF",
    border: "#DDDDDD",
    input: { color: "#F5F5F5", accent: "#DBDBDB" } as ColorSchema,
    font: { color: "#383838", accent: "#a9acb3" } as ColorFont,
    background: { color: "#ffffff", accent: "#efefef" } as ColorSchema
  } as Palette,
  border: BaseBorder,
  margin: BaseMargin,
};

export const Light = theme;
