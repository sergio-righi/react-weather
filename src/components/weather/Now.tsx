import React from "react";
import { Constants } from "utils";
import { Common } from "components";
import { Box, Typography } from "@mui/material";
import { useApp, useTheme, useService } from "contexts";
import { HDate, HNumber, HString } from "helpers";

type Props = {};

export const Now = (props: Props) => {
  const { font } = useTheme();
  const { weather } = useService();
  const { location, t } = useApp();

  const datenow = new Date();
  const validdatetime = HDate.toISOString(datenow);
  const parameters = [];
  const locations = Constants.LOCATIONS_GEO[location];

  const [data, setData] = React.useState({} as any);

  React.useEffect(() => {
    const fetchData = async () => {
      // setData(
      //   await service.weather.makeRequest(validdatetime, parameters, locations)
      // );
    };
    fetchData();
  }, [location]);

  const code = null;
  const temperature = -1;
  const isDay = false;
  const description = ""; //t.message.weather[Weather.getDescription(code)];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: font.medium }}
        >
          {HDate.weekday(datenow)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Common.WeatherIcon code={Number(code)} day={isDay} />
        <Common.Temperature value={temperature} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: font.medium }}
        >
          {description}
        </Typography>
        <Typography
          component="div"
          sx={{
            fontSize: font.sm,
            fontWeight: font.medium,
          }}
        >
          {HString.interpolate(t.message.feedback.updated_at, {
            time: HNumber.toTimeAmPmString(HDate.toSeconds(datenow), false),
          })}
        </Typography>
      </Box>
    </>
  );
};
