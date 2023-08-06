import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Card } from "components";
import { Constants } from "utils";
import { useApp, useService } from "contexts";
import { HDate, HWeather } from "helpers";

type Props = {
  onClick: (value: any) => void;
};

export const Week = (props: Props) => {
  const { location, t } = useApp();
  const { weather } = useService();

  const datenow = new Date();
  const validdatetime = HWeather.getRangeDateAsParam();
  const locations = Constants.LOCATIONS_GEO[location];

  const [data, setData] = useState(null);
  const [currentDate, setCurrentDate] = useState(datenow);

  const isToday = (date: any) => HDate.isDateEquals(currentDate, date);
  const handleDateClick = (date: any) => {
    setCurrentDate(date);
    props.onClick && props.onClick(date);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      // setData(
      //   await service.weather.makeRequest(validdatetime, parameters, locations)
      // );
    };
    fetchData();
  }, [location]);

  {
    /* <Card.Weather
                    date={item}
                    code={code}
                    max={max}
                    min={min}
                    day={isDay}
                    description={description}
                    selected={isToday(item)}
                    onClick={handleDateClick}
                  /> */
  }

  return <></>;
};
