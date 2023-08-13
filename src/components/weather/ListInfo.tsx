import { Common, Custom, Weather } from "components";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CurrentApi } from "interfaces";
import { HDate, HString } from "helpers";
import { useApp, useTheme } from "contexts";
import {
  GlobalWarming,
  Night,
  Humid,
  Hygrometer,
  Sun,
  Visibility,
  Thermometer,
  Wind,
} from "assets/images";

// icons
import { RefreshRounded } from "@mui/icons-material";
import { Weather as WeatherUtil } from "utils";

type Props = {
  data: CurrentApi;
  onRefresh: () => void;
};

export const ListInfo = (props: Props) => {
  const { isMetric, t } = useApp();

  return (
    <List sx={{ height: 1, display: "flex", flexDirection: "column" }}>
      {/* day or night + description */}
      <ListItem>
        <ListItemIcon>
          <Common.Image
            src={props.data.is_day ? Sun : Night}
            width={32}
            height={32}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Custom.Typography>{props.data.condition.text}</Custom.Typography>
          }
        />
      </ListItem>

      {/* feels like */}
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Common.Image src={Thermometer} width={32} height={32} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Weather.FeelsLike
              tempC={props.data.feelslike_c}
              tempF={props.data.feelslike_f}
            />
          }
        />
      </ListItem>

      {/* precipitation */}
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Common.Image src={Hygrometer} width={32} height={32} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Custom.Typography>
              {isMetric ? props.data.precip_mm : props.data.precip_in}{" "}
              {isMetric ? t.label.liquid.metric : t.label.liquid.imperial}
            </Custom.Typography>
          }
        />
      </ListItem>

      {/* wind */}
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Common.Image src={Wind} width={32} height={32} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Custom.Typography>
              {isMetric ? props.data.wind_kph : props.data.wind_mph}{" "}
              {isMetric ? t.label.speed.metric : t.label.speed.imperial}
            </Custom.Typography>
          }
        />
      </ListItem>

      {/* visibility */}
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Common.Image src={Visibility} width={32} height={32} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Custom.Typography>
              {isMetric ? props.data.vis_km : props.data.vis_miles}{" "}
              {isMetric ? t.label.distance.metric : t.label.distance.imperial}
            </Custom.Typography>
          }
        />
      </ListItem>

      {/* humidity */}
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Common.Image src={Humid} width={32} height={32} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Custom.Typography>{props.data.humidity} %</Custom.Typography>
          }
        />
      </ListItem>

      {/* uv index */}
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Common.Image src={GlobalWarming} width={32} height={32} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Custom.Typography>
              {props.data.uv} (
              {WeatherUtil.getUVIndexDescription(props.data.uv, t)})
            </Custom.Typography>
          }
        />
      </ListItem>

      <ListItem sx={{ mt: "auto" }}>
        <ListItemIcon>
          <Custom.IconButton onClick={props.onRefresh}>
            <RefreshRounded />
          </Custom.IconButton>
        </ListItemIcon>
        <ListItemText
          primary={
            <Custom.Typography variant="h6">
              {HString.interpolate(t.message.feedback.updated_at, {
                time: HDate.toTimeAmPmString(
                  HDate.toSeconds(new Date(props.data.last_updated)),
                  false
                ),
              })}
            </Custom.Typography>
          }
        />
      </ListItem>
    </List>
  );
};
