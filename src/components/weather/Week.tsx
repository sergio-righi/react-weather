import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Card } from "components";
import { Constants } from "utils";
import { useApp, useService, useTheme } from "contexts";
import { HDate, HWeather } from "helpers";
import { ForecastApi, WeatherApi } from "interfaces";

type Props = {
  onClick: (value: any) => void;
};

export const Week = (props: Props) => {
  const { margin } = useTheme();
  const { location, t } = useApp();
  const { weather } = useService();

  const datenow = new Date();
  const locations = Constants.LOCATIONS_GEO[location];

  const [data, setData] = useState<WeatherApi>({} as WeatherApi);
  const [currentDate, setCurrentDate] = useState<Date>(datenow);

  const handleDateClick = (date: any) => {
    setCurrentDate(date);
    props.onClick && props.onClick(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(await weather.week(location));
    };
    fetchData();
  }, [location]);

  return (
    <Grid container spacing={margin.md}>
      {data &&
        data.forecast &&
        data.forecast.forecastday.map((item: ForecastApi) => {
          return (
            <Grid item xs>
              <Card.Weather item={item} onClick={handleDateClick} />
            </Grid>
          );
        })}
    </Grid>
  );
};
