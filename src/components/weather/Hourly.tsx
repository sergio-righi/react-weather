import { useState } from "react";
import { Card, Controller } from "components";
import { ForecastApi, HourApi } from "interfaces";

type Props = {
  data: ForecastApi;
};

export const Hourly = (props: Props) => {
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());

  return (
    <Controller.HorizontalScroll centeredId={`elm-scroll-${currentHour}`}>
      {props.data &&
        props.data.hour &&
        props.data.hour.map((item: HourApi, i: number) => (
          <Card.Hour item={item} key={i} id={`elm-scroll-${i}`} />
        ))}
    </Controller.HorizontalScroll>
  );
};
