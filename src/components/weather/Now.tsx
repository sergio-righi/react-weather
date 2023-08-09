import React, { useEffect } from "react";
import { Common, Weather } from "components";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Custom } from "components";
import { CurrentApi } from "interfaces";
import { HDate, HString } from "helpers";
import { useApp, useService, useTheme } from "contexts";

// icons
import { WbSunny, BeachAccess, RestaurantMenu } from "@mui/icons-material";

type Props = {};

export const Now = (props: Props) => {
  const { margin, palette } = useTheme();
  const { weather } = useService();
  const { location, t } = useApp();

  const datenow = new Date();
  const [data, setData] = React.useState<CurrentApi>({} as CurrentApi);

  useEffect(() => {
    const fetchData = async () => setData(await weather.current(location));
    fetchData();
  }, [location]);

  return (
    data &&
    data.condition && (
      <Stack>
        <Stack p={margin.md}>
          <Weather.Search />
          {/* Weather Information */}
          <Common.WeatherIcon condition={data.condition} />
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
        {/* Weather Conditions List */}
        <List>
          <ListItem>
            <ListItemIcon>
              <WbSunny />
            </ListItemIcon>
            <ListItemText primary={data.condition.text} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BeachAccess />
            </ListItemIcon>
            <ListItemText
              primary={
                <Common.FeelsLike
                  tempC={data.feelslike_c}
                  tempF={data.feelslike_f}
                />
              }
            />
          </ListItem>
          {/* <ListItem>
            <ListItemIcon>
              <RestaurantMenu />
            </ListItemIcon>
            <ListItemText
              primary={HString.interpolate(t.message.feedback.updated_at, {
                time: HDate.toTimeAmPmString(
                  HDate.toSeconds(new Date(data.last_updated)),
                  false
                ),
              })}
            />
          </ListItem> */}
        </List>
      </Stack>
    )
  );
};
