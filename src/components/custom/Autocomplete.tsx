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
    value: PairValue | null
  ) => void;
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
};

export const Autocomplete = (props: Props) => {
  const { t } = useApp();
  const { palette } = useTheme();

  return (
    <MUIAutocomplete
      multiple={false}
      onChange={(
        event: React.SyntheticEvent<Element, Event>,
        value: PairValue | null
      ) => props.onChange && props.onChange(event, value)}
      noOptionsText={t.message.placeholder.no_option}
      options={props.items.map((item: PairValue) => item)}
      getOptionLabel={(option: PairValue) => option.value}
      onInputChange={(
        event: React.SyntheticEvent<Element, Event>,
        value: string
      ) => props.onInputChange && props.onInputChange(event, value)}
      // defaultValue={props.value}
      // renderTags={(value, getTagProps) =>
      //   value.map((option: PairValue, index: number) => (
      //     <Custom.Chip
      //       label={option.value}
      //       sx={{
      //         backgroundColor: palette.background.accent,
      //       }}
      //       {...getTagProps({ index })}
      //     />
      //   ))
      // }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
        />
      )}
    />
  );
};
