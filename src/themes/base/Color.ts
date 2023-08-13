/* eslint-disable quotes */
import {
  Color,
  ColorSchema,
  ColorStatus,
} from "themes/interfaces";

export default {
  primary: { color: "#9A9A9A", text: "#ffffff" } as ColorSchema,
  accent: { color: "#5b9bff", text: "#ffffff" } as ColorSchema,
  status: {
    warning: { color: "#FEDB60", text: "#404040" } as ColorSchema,
    success: { color: "#57A75B", text: "#ffffff" } as ColorSchema,
    error: { color: "#E15858", text: "#ffffff" } as ColorSchema,
  } as ColorStatus,
  black: "#000000",
  white: "#ffffff"
} as Color;
