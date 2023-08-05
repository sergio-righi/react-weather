import React, { useState, useEffect } from "react";
import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";
import { Validations } from "utils";

type Props = {
  sx?: any;
  id?: number;
  name?: string;
  label?: string;
  checked?: boolean;
  canFocus?: boolean;
  required?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    value?: number
  ) => void;
};

export const Checkbox = (props: Props) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => setChecked(props.checked ?? false), [props.checked]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    props.onChange && props.onChange(event, checked, props.id);
    setChecked(checked);
  };

  function render(): React.ReactElement {
    return (
      <MUICheckbox
        value={true}
        edge="start"
        disableRipple
        name={props.name}
        checked={checked}
        onChange={handleChange}
        required={props.required}
        tabIndex={props.canFocus ? undefined : -1}
      />
    );
  }

  return Validations.hasValue(props.label) ? (
    <FormControlLabel control={render()} label={props.label} />
  ) : (
    render()
  );
};

Checkbox.defaultProps = {
  canFocus: true,
  required: false,
};
