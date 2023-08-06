import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  SelectChangeEvent,
} from "@mui/material";
import { PairValue } from "types";
import { useTheme } from "contexts";
import { HValidation } from "helpers";

type Props = {
  sx?: any;
  id?: string;
  name?: string;
  label?: string;
  items: PairValue[];
  disabled?: boolean;
  value?: string | "";
  onChange?: (value: string) => void;
  onDropdownChange?: (event: SelectChangeEvent<number>) => void;
};

export const Select = (props: Props) => {
  const { border, color, palette } = useTheme();
  const [value, setValue] = useState<string | "">(props.value ?? "");

  useEffect(() => setValue(props.value ?? ""), [props.value]);

  const variant = HValidation.hasValue(props.label) ? "filled" : "outlined";

  const handleChange = (value: string): void => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const handleDropdownChange = (event: SelectChangeEvent<number>): void =>
    props.onDropdownChange && props.onDropdownChange(event);

  return (
    props.items && (
      <FormControl
        variant={variant}
        sx={{ width: 1, display: "flex", flexDirection: "row" }}
      >
        {props.label && (
          <InputLabel
            id={props.id}
            sx={{
              color: props.disabled
                ? palette.background.accent
                : palette.font.color,
            }}
          >
            {props.label}
          </InputLabel>
        )}
        <MUISelect
          // value={value}
          name={props.name}
          labelId={props.id}
          disabled={props.disabled}
          // onChange={handleDropdownChange}
          sx={{
            width: 1,
            "& .MuiSelect-icon": {
              color: props.disabled
                ? palette.background.accent
                : palette.font.color,
            },
            "& .MuiFormLabel-root": {
              color: palette.font.color,
            },
            "& .MuiSelect-select": {
              color: palette.font.color,
            },
            "& .MuiSelect-filled": {
              borderRadius: border.radius / 4,
              backgroundColor: palette.background.color,
              borderBottomWidth: 2,
              borderBottomStyle: "solid",
              borderBottomColor: palette.background.color,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              "&:focus": {
                borderBottomColor: color.primary.color,
              },
            },
          }}
          MenuProps={{
            MenuListProps: {
              sx: {
                color: palette.font.color,
                backgroundColor: palette.background.accent,
              },
            },
          }}
        >
          {props.items.map((item: PairValue) => (
            <MenuItem
              key={item.key}
              value={item.key}
              onClick={() => handleChange(item.key)}
            >
              {item.value}
            </MenuItem>
          ))}
        </MUISelect>
      </FormControl>
    )
  );
};
