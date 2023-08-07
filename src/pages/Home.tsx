import { useEffect, useState } from "react";
import { useApp, useService, useTheme } from "contexts";
import { Stack } from "@mui/material";
import { Weather } from "components";
import { WeatherApi } from "interfaces";
import { HDate } from "helpers";

type Props = {};

export const Home = (props: Props) => {
  const { weather } = useService();
  const { location, t } = useApp();
  const { margin, palette } = useTheme();
  const [data, setData] = useState<WeatherApi>({} as WeatherApi);
  const [currentDate, setCurrentDate] = useState<string>(
    HDate.toISOString(new Date())
  );

  const handleClick = (date: string) => setCurrentDate(date);

  useEffect(() => {
    const fetchData = async () => setData(await weather.week(location));
    fetchData();
  }, [location]);

  return (
    <>
      <Stack
        className="wa-panel fixed"
        bgcolor={palette.background.color}
        height={margin.factor * margin.xl * 12}
      >
        <Weather.Now />
      </Stack>
      <Stack
        spacing={margin.md}
        className="wa-panel"
        marginTop={margin.xl * 12}
        bgcolor={palette.background.accent}
      >
        <Weather.Week data={data} onClick={handleClick} />
        <Weather.Hourly data={data} date={currentDate} />
      </Stack>
    </>
  );
};
