import { Common, Weather } from "components";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CurrentApi } from "interfaces";
import { HDate, HString } from "helpers";
import { useApp, useService, useTheme } from "contexts";

// icons
import { BeachAccess, RestaurantMenu, WbSunny } from "@mui/icons-material";

type Props = {
  data: CurrentApi;
};

export const ListInfo = (props: Props) => {
  const { margin, palette } = useTheme();
  const { weather } = useService();
  const { location, t } = useApp();

  return (
    <List sx={{ height: 1 }}>
      <ListItem>
        <ListItemIcon>
          <WbSunny />
        </ListItemIcon>
        <ListItemText primary={props.data.condition.text} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <BeachAccess />
        </ListItemIcon>
        <ListItemText
          primary={
            <Common.FeelsLike
              tempC={props.data.feelslike_c}
              tempF={props.data.feelslike_f}
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
              HDate.toSeconds(new Date(props.data.last_updated)),
              false
            ),
          })}
        />
      </ListItem>
    </List>
  );
};
