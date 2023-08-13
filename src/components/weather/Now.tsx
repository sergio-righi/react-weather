import React, { useEffect } from "react";
import { Weather } from "components";
import { Stack } from "@mui/material";
import { Custom } from "components";
import { CurrentApi } from "interfaces";
import { HDate } from "helpers";
import { useApp, useService, useTheme } from "contexts";

type Props = {};

export const Now = (props: Props) => {
  const { theme } = useTheme();
  const { weather } = useService();
  const { location } = useApp();

  const datenow = new Date();
  const [data, setData] = React.useState<CurrentApi>({} as CurrentApi);

  useEffect(() => {
    handleRefreshClick();
  }, [location]);

  async function handleRefreshClick() {
    setData(await weather.current(location.value));
  }

  return (
    data &&
    data.condition && (
      <Stack direction="column" height={1}>
        {/* First Section */}
        <Stack direction="column" p={theme.margin.md} spacing={theme.margin.md}>
          {/* Weather Searchbar */}
          <Weather.Search />

          {/* Weather Navbar */}
          <Weather.Navigation />

          {/* Weather Information */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={theme.margin.md}
          >
            {/* Thumbnail */}
            <Weather.Icon condition={data.condition} />

            {/* Temperature */}
            <Stack spacing={theme.margin.md}>
              <Weather.Temperature
                size="lg"
                tempC={data.temp_c}
                tempF={data.temp_f}
              />
              <Stack direction="row" spacing={theme.margin.sm}>
                <Custom.Typography
                  variant="h5"
                  fontWeight={theme.font.semiBold}
                >
                  {HDate.weekday(datenow)}
                </Custom.Typography>
                <Custom.Typography
                  variant="h5"
                  color={theme.palette.font.accent}
                >
                  {HDate.toTimeAmPmString(HDate.toSeconds(datenow), false)}
                </Custom.Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Second Section */}
        <Weather.ListInfo data={data} onRefresh={handleRefreshClick} />
      </Stack>
    )
  );
};
