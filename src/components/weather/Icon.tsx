import { Box } from "@mui/material";
import { ConditionApi } from "interfaces";
import { Weather } from "utils";

type Props = {
  condition: ConditionApi;
};

export const Icon = (props: Props) => {
  return props.condition && props.condition.code ? (
    <Box
      maxWidth={100}
      component="img"
      alt={props.condition.text}
      src={Weather.WEATHER_ICONS[props.condition.code]}
    />
  ) : (
    <></>
  );
};
