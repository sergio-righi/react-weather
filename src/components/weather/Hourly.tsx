import React, { useState } from "react";
import { Card, Controller } from "components";
import { ForecastApi, HourApi } from "interfaces";
import { SoundEngine } from "utils/audio";

type Props = {
  data: ForecastApi;
  onSelectHour?: (hour: HourApi) => void;
};

export const Hourly: React.FC<Props> = ({ data, onSelectHour }) => {
  const currentHourNow = new Date().getHours();
  const [selectedHour, setSelectedHour] = useState<number>(currentHourNow);

  const handleHourClick = (hour: HourApi, index: number) => {
    SoundEngine.playTactileClick();
    setSelectedHour(index);
    onSelectHour?.(hour);
  };

  return (
    <Controller.HorizontalScroll centeredId={`elm-scroll-${selectedHour}`}>
      {data?.hour?.map((item: HourApi, i: number) => (
        <Card.Hour
          key={i}
          id={`elm-scroll-${i}`}
          item={item}
          isActive={selectedHour === i}
          onSelect={() => handleHourClick(item, i)}
        />
      ))}
    </Controller.HorizontalScroll>
  );
};
