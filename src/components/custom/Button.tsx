import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";
import { useTheme } from "contexts";
import { HString } from "helpers";

type Props = ButtonProps & {
  sx?: any;
  text?: boolean;
  submit?: boolean;
  tabIndex?: number;
  secondary?: boolean;
  children: string | React.ReactNode;
  onClick?: (event: any) => void;
};

export const Button = (props: Props) => {
  const { border, color } = useTheme();
  const accentColor = props.sx?.backgroundColor ?? color.accent.color;

  function handleClick(event: any) {
    props.onClick && props.onClick(event);
  }

  return (
    <MUIButton
      size={props.size}
      href={props.href}
      disabled={props.disabled}
      tabIndex={props.tabIndex}
      variant={props.secondary ? "outlined" : props.text ? "text" : "contained"}
      sx={{
        borderRadius: border.radius,
        borderColor: props.secondary ? accentColor : null,
        backgroundColor:
          props.secondary || props.text ? "transparent" : accentColor,
        color:
          props.secondary || props.text
            ? accentColor
            : HString.getContrast(accentColor),
        "&:hover": {
          opacity: 0.8,
          color:
            props.secondary || props.text
              ? accentColor
              : HString.getContrast(accentColor),
          backgroundColor:
            props.secondary || props.text ? "transparent" : accentColor,
          borderColor: accentColor,
          ...props.sx,
        },
      }}
      onClick={handleClick}
      type={props.submit ? "submit" : "button"}
    >
      {props.children}
    </MUIButton>
  );
};
