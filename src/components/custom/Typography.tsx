import { useTheme } from "contexts";
import { Typography as MUITyphography, TypographyProps } from "@mui/material";

type Props = TypographyProps & {
  align?: "center" | "right" | "left";
  as?: "header" | "subheader" | "small" | "medium" | "large" | "span" | "p";
  weight?:
    | "thin"
    | "extraLight"
    | "light"
    | "normal"
    | "medium"
    | "semiBold"
    | "bold"
    | "extraBold"
    | "black";
};

export const Typography = (props: Props) => {
  const { font, palette } = useTheme();

  const h1 = { fontSize: font.xxl, fontWeight: font.bold };
  const h2 = { fontSize: font.xl, fontWeight: font.bold };
  const h3 = { fontSize: font.lg, fontWeight: font.bold };
  const h4 = { fontSize: font.md, fontWeight: font.bold };
  const h5 = { fontSize: font.sm, fontWeight: font.normal };
  const h6 = { fontSize: font.xs, fontWeight: font.normal };

  const p = { fontSize: font.sm, fontWeight: font.normal };
  const span = { fontSize: font.xs, fontWeight: font.normal };
  const small = { fontSize: font.xxs, fontWeight: font.normal };

  const stylesheet =
    props.variant === "h1" || props.as === "large"
      ? h1
      : props.variant === "h2" || props.as === "medium"
      ? h2
      : props.variant === "h3" || props.as === "header"
      ? h3
      : props.variant === "h4"
      ? h4
      : props.variant === "h5"
      ? h5
      : props.variant === "h6" || props.as === "subheader"
      ? h6
      : props.as === "small"
      ? small
      : props.as === "span"
      ? span
      : props.as === "p"
      ? p
      : undefined;

  const weight =
    props.weight === "thin"
      ? font.thin
      : props.weight === "extraLight"
      ? font.extraLight
      : props.weight === "light"
      ? font.light
      : props.weight === "normal"
      ? font.normal
      : props.weight === "medium"
      ? font.medium
      : props.weight === "semiBold"
      ? font.semiBold
      : props.weight === "bold"
      ? font.bold
      : props.weight === "extraBold"
      ? font.extraBold
      : props.weight === "black"
      ? font.black
      : undefined;

  return (
    <MUITyphography
      component="span"
      textAlign={props.align}
      fontSize={stylesheet?.fontSize}
      fontWeight={weight ?? stylesheet?.fontWeight}
      color={props.color ?? palette.font.color}
      {...props}
    >
      {props.children}
    </MUITyphography>
  );
};

Typography.defaultProps = {
  align: "left",
};
