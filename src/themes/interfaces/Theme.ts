import type { Border, Color, Font, Spacing, Palette } from 'themes/interfaces';

export interface Theme {
  id: number;
  font: Font;
  color: Color;
  spacing: Spacing;
  border: Border;
  palette: Palette;
}
