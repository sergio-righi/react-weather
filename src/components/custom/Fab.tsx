import React from "react";
import { Fab as MUIFab } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { HValidation } from "helpers";

// icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

type Props = {
  sx?: any;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "add" | "edit" | "delete" | "filter" | "list" | "hide";
};

export const Fab = (props: Props) => {
  const { t } = useApp();
  const { margin } = useTheme();

  const text =
    props.variant === "add"
      ? t.action.add
      : props.variant === "edit"
      ? t.action.edit
      : props.variant === "delete"
      ? t.action.delete
      : props.variant === "list"
      ? t.action.list_view
      : props.variant === "filter"
      ? t.action.filter
      : "";

  const mr = HValidation.hasValue(text) ? margin.xs : 0;

  const icon =
    props.variant === "add" ? (
      <AddIcon sx={{ mr }} />
    ) : props.variant === "edit" ? (
      <EditIcon sx={{ mr }} />
    ) : props.variant === "delete" ? (
      <DeleteIcon sx={{ mr }} />
    ) : props.variant === "list" ? (
      <MenuOpenOutlinedIcon sx={{ mr }} />
    ) : props.variant === "hide" ? (
      <CloseOutlinedIcon sx={{ mr }} />
    ) : (
      <FilterAltIcon sx={{ mr }} />
    );

  return (
    <MUIFab
      variant="extended"
      sx={{
        position: "fixed",
        right: margin.default,
        bottom: margin.default,
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {props.children ? (
        props.children
      ) : (
        <>
          {icon} {text}
        </>
      )}
    </MUIFab>
  );
};
