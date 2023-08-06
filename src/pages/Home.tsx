import { useState } from "react";
import { useApp, useService, useTheme } from "contexts";
import { Box } from "@mui/material";
import { Weather } from "components";
import { Constants } from "utils";
import { HDate } from "helpers";

type Props = {};

export const Home = (props: Props) => {
  // const { weather } = useService();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log(await weather.today("Toronto"));
  //   };
  //   fetchData();
  // }, []);

  const { weather } = useService();
  const { location, t } = useApp();
  const { margin, palette } = useTheme();
  const datenow = new Date();
  const validdatetime = HDate.toISOString(datenow);
  const locations = Constants.LOCATIONS_GEO[location];

  // const [weather, setWeather] = useState({});
  const [currentDate, setCurrentDate] = useState(datenow);

  const handleClick = (date: any) => setCurrentDate(new Date(date));

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     setWeather(
  //       await service.weather.now(validdatetime, parameters, locations)
  //     );
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Box
        className="wa-panel fixed"
        bgcolor={palette.background.color}
        height={margin.factor * margin.xl * 12}
      >
        <Weather.Now />
      </Box>
      <Box
        className="wa-panel"
        marginTop={margin.xl * 12}
        bgcolor={palette.background.accent}
      >
        <Weather.Week onClick={handleClick} />
        <Weather.Hourly date={currentDate} />
      </Box>
    </>
  );
};
