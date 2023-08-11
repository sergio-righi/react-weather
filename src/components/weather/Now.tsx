import React, { useEffect } from "react";
import { Common, Weather } from "components";
import { Stack } from "@mui/material";
import { Custom } from "components";
import { CurrentApi } from "interfaces";
import { HDate } from "helpers";
import { useApp, useService, useTheme } from "contexts";

type Props = {};

export const Now = (props: Props) => {
  const { margin, palette } = useTheme();
  const { weather } = useService();
  const { location, t } = useApp();

  const datenow = new Date();
  const [data, setData] = React.useState<CurrentApi>({} as CurrentApi);

  useEffect(() => {
    const fetchData = async () =>
      setData(await weather.current(location.value));
    fetchData();
  }, [location]);

  return (
    data &&
    data.condition && (
      <Stack direction="column" height={1}>
        {/* First Section */}
        <Stack direction="column" p={margin.md} spacing={margin.md}>
          {/* Weather Searchbar */}
          <Weather.Search />

          {/* Weather Navbar */}
          <Weather.Navigation />

          {/* Weather Information */}
          <Stack
            direction="row"
            spacing={margin.md}
            alignItems="center"
            justifyContent="center"
          >
            {/* Thumbnail */}
            <Common.WeatherIcon condition={data.condition} />

            {/* Temperature */}
            <Stack spacing={margin.md}>
              <Custom.Typography variant="h5" color={palette.font.accent}>
                {data.is_day ? "Day" : "Night"}
              </Custom.Typography>
              <Common.Temperature
                size="lg"
                tempC={data.temp_c}
                tempF={data.temp_f}
              />
              <Stack direction="row" spacing={margin.sm}>
                <Custom.Typography variant="h5">
                  {HDate.weekday(datenow)}
                </Custom.Typography>
                <Custom.Typography variant="h5" color={palette.font.accent}>
                  {HDate.toTimeAmPmString(HDate.toSeconds(datenow), false)}
                </Custom.Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Second Section */}
        <Weather.ListInfo data={data} />
      </Stack>
    )
  );
};
