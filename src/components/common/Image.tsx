import { Box } from "@mui/material";
import React from "react";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const Image = (props: Props) => {
  return <Box {...props} component="img" />;
};
