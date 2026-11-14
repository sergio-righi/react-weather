import {
  Color,
  ColorSchema,
  ColorStatus,
} from "themes/interfaces";

export default {
  primary: { color: "#64748B", text: "#FFFFFF" } as ColorSchema,
  accent: { color: "#00D2FF", text: "#FFFFFF" } as ColorSchema,
  status: {
    warning: { color: "#FBBF24", text: "#1E293B" } as ColorSchema,
    success: { color: "#10B981", text: "#FFFFFF" } as ColorSchema,
    error: { color: "#F43F5E", text: "#FFFFFF" } as ColorSchema,
  } as ColorStatus,
  black: "#000000",
  white: "#FFFFFF",
} as Color;
