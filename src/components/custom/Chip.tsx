import React, { FunctionComponent } from "react";
import { Chip as MUIChip } from "@mui/material";
import { useTheme } from "contexts";

export type Props = {
  sx?: any;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  id?: string | number;
  icon?: React.ReactElement;
  size?: "small" | "medium" | undefined;
  onClick?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
};

export const Chip: FunctionComponent<Props> = (props: Props) => {
  const { border, color, font, palette } = useTheme();

  const textColor =
    props.sx && "color" in props.sx ? props.sx.color : palette.font.color;

  const backgroundColor =
    props.sx && "backgroundColor" in props.sx
      ? props.sx.backgroundColor
      : palette.theme;

  const stylesheet = {
    color: props.selected ? color.accent.text : textColor,
    backgroundColor: props.selected ? color.accent.color : backgroundColor,
  };

  const fontSize =
    props.sx && "fontSize" in props.sx ? props.sx.fontSize : font.xs;

  const fontWeight =
    props.sx && "fontWeight" in props.sx ? props.sx.fontWeight : font.semiBold;

  const handleClick = () =>
    props.onClick && props.onClick(props.id ?? props.label);

  const handleDelete = () =>
    props.onDelete && props.onDelete(props.id ?? props.label);

  return (
    <>
      <MUIChip
        sx={{
          ...props.sx,
          ...stylesheet,
          fontSize: fontSize,
          fontWeight: fontWeight,
          borderRadius: border.circle,
          "&:hover": stylesheet,
          "& .MuiChip-icon": {
            color: "currentColor",
          },
          "& .MuiChip-deleteIcon": {
            color: palette.font.color,
            "&:hover": {
              color: palette.font.color,
            },
          },
        }}
        size={props.size}
        label={props.label}
        icon={props.icon}
        onClick={props.onClick ? handleClick : undefined}
        onDelete={props.onDelete ? handleDelete : undefined}
        disabled={props.disabled}
      />
    </>
  );
};

Chip.defaultProps = {
  selected: false,
};
