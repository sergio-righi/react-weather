import {
  ColorSchema,
  ColorStatus,
} from "themes/interfaces";

export interface Color {
  primary: ColorSchema;
  accent: ColorSchema;
  status: ColorStatus;
  black: string;
  white: string;
}
