import { Switch as MUISwitch } from "@mui/material";

type Props = {
  checked: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

export const Switch = (props: Props) => {
  return (
    <MUISwitch edge="end" checked={props.checked} onChange={props.onChange} />
  );
};

Switch.defaultProps = {
  checked: false,
};
