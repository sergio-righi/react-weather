import React, { useEffect } from "react";
import { Common, Weather } from "components";
import {
  IconButton,
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
import {
  AddRounded,
  BeachAccess,
  ArrowBackRounded,
  ArrowForwardRounded,
  DeleteOutlineRounded,
  RestaurantMenu,
  WbSunny,
} from "@mui/icons-material";

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
      <Stack direction="column" height={1}>
        {/* First Section */}
        <Stack direction="column" p={margin.md} spacing={margin.md}>
          {/* Weather Searchbar */}
          <Stack direction="column">
            <Weather.Search />
          </Stack>

          {/* Weather Navbar */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Custom.Typography variant="h5">{location}</Custom.Typography>
            <Stack direction="row">
              <IconButton>
                <ArrowBackRounded />
              </IconButton>
              <IconButton>
                <ArrowForwardRounded />
              </IconButton>
              <IconButton>
                <AddRounded />
              </IconButton>
              <IconButton>
                <DeleteOutlineRounded />
              </IconButton>
            </Stack>
          </Stack>

          {/* Weather Information */}
          <Stack direction="column">
            {/* Thumbnail */}
            <Stack alignItems="center" justifyContent="center">
              <Common.WeatherIcon condition={data.condition} />
            </Stack>

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
        <List sx={{ height: 1 }}>
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
          <ListItem>
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
          </ListItem>
        </List>
      </Stack>
    )
  );
};
