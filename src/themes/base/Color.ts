import {
  Color,
  ColorSchema,
  ColorStatus,
} from "themes/interfaces";

// Nature Distilled Palette
// Primary: #C67B5C (Terracotta / Warm Clay), #D4C4A8 (Sand / Linen), #B5651D (Warm Ochre / Bark), #F5F0E1 (Warm Parchment)
// Secondary: #8B4513 (Saddle Wood / Earth), #6B7B3C (Moss / Olive Herb), #9C8B7A (Warm Mineral / Muted Soil)
export default {
  primary: { color: "#C67B5C", text: "#FFFFFF" } as ColorSchema,
  accent: { color: "#C67B5C", text: "#FFFFFF" } as ColorSchema,
  status: {
    warning: { color: "#B5651D", text: "#FFFFFF" } as ColorSchema,
    success: { color: "#6B7B3C", text: "#FFFFFF" } as ColorSchema,
    error: { color: "#A8432A", text: "#FFFFFF" } as ColorSchema,
    info: { color: "#8B4513", text: "#FFFFFF" } as ColorSchema,
  } as unknown as ColorStatus,
  black: "#1F1A17", // Organic charcoal bark
  white: "#FDFBF7", // Handmade warm paper
} as Color;

