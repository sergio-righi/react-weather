import { Box } from "@mui/material";
import { ConditionApi } from "interfaces";

type Props = {
  condition: ConditionApi;
};

export const WeatherIcon = (props: Props) => {
  return props.condition && props.condition.icon ? (
    <Box component="img" src={props.condition?.icon} />
  ) : (
    <></>
  );
};
