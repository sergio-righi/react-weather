import React from "react";
import {
  RadioGroup as MUIRadioGroup,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { useTheme } from "contexts";
import { Custom } from "components";

export type RadioProps = {
  value?: any;
  label: string;
};

type Props = {
  sx?: any;
  value?: any;
  name?: string;
  inline?: boolean;
  items: RadioProps[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
};

export const RadioGroup = (props: Props) => {
  const { font, margin, palette } = useTheme();

  return (
    <MUIRadioGroup
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    >
      <Stack
        flexWrap="wrap"
        px={margin.md}
        direction={props.inline ? "row" : "column"}
        gap={props.inline ? margin.md : undefined}
      >
        {props.items.map((item: RadioProps, i: number) => (
          <FormControlLabel
            key={i}
            label={item.label}
            value={item.value ?? item.label}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: font.sm,
                color: palette.font.color,
              },
            }}
            control={<Custom.Radio />}
          />
        ))}
      </Stack>
    </MUIRadioGroup>
  );
};
