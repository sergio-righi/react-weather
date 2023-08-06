import { PairValue } from "types";
import { Custom } from "components";
import { useApp, useTheme } from "contexts";
import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";

export type Props = {
  sx?: any;
  name?: string;
  label?: string;
  limitTags?: number;
  multiple?: boolean;
  placeholder?: string;
  items: PairValue[];
  value?: PairValue[];
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: PairValue[] | null
  ) => void;
};

export const Autocomplete = (props: Props) => {
  const { t } = useApp();
  const { border, color, palette } = useTheme();

  return (
    <MUIAutocomplete
      multiple
      onChange={(e: any, items: PairValue[]) =>
        props.onChange && props.onChange(e, items)
      }
      noOptionsText={t.message.placeholder.no_option}
      options={props.items.map((item: PairValue) => item)}
      getOptionLabel={(option: PairValue) => option.value}
      defaultValue={props.value}
      renderTags={(value, getTagProps) =>
        value.map((option: PairValue, index: number) => (
          <Custom.Chip
            label={option.value}
            sx={{
              backgroundColor: palette.background.accent,
            }}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          sx={{
            width: 1,
            backgroundColor: palette.background.color,
            "& label": {
              color: palette.font.color,
            },
            "& .MuiTextField-root": {
              backgroundColor: palette.background.color,
              "&:hover": {
                backgroundColor: palette.background.color,
              },
            },
            "& .MuiInputBase-root": {
              backgroundColor: palette.background.color,
              "&:focused": {
                backgroundColor: palette.background.color,
              },
            },
            "& .MuiInputBase-input": {
              color: palette.background.text,
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
            "& .MuiInputBase-inputMultiline": {
              color: palette.font.color,
            },
            "& input": {
              color: palette.font.color,
            },
            "& .Mui-disabled": {
              color: color.disabled.color,
              backgroundColor: palette.background.color,
              WebkitTextFillColor: color.disabled.color,
            },
            "& .MuiAutocomplete-clearIndicator, & .MuiAutocomplete-popupIndicator":
              {
                color: palette.font.color,
              },
          }}
          {...params}
          variant="filled"
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
        />
      )}
    />
  );
};
