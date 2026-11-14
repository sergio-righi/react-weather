import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Card } from "components";
import { useApp, useTheme } from "contexts";
import { ForecastApi, WeatherApi } from "interfaces";

type Props = {
  data: WeatherApi;
};

export const Week: React.FC<Props> = ({ data }) => {
  const { theme } = useTheme();
  const { currentDate, setCurrentDate } = useApp();

  useEffect(() => {
    const days = data?.forecast?.forecastday;
    if (days && days.length > 0) {
      const dates = days.map((item: ForecastApi) => item.date);
      if (!dates.includes(currentDate)) {
        setCurrentDate(dates[0]);
      }
    }
  }, [data, currentDate, setCurrentDate]);

  const days = data?.forecast?.forecastday || [];
  const colSpan = Math.max(12 / (days.length || 3), 3);

  return (
    <Grid container spacing={theme.margin.sm} alignItems="stretch">
      {days.map((item: ForecastApi, i: number) => (
        <Grid item xs={12} sm={6} md={colSpan} key={item.date || i}>
          <Card.Week item={item} selected={currentDate === item.date} />
        </Grid>
      ))}
    </Grid>
  );
};
