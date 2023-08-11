import React, { createContext, useContext } from "react";
import { Constants, Enums, Store, Weather } from "utils";
import { PairValue } from "types";
import { HDate } from "helpers";

interface ProvidedValueType {
  location: PairValue;
  setLocation: (location: PairValue) => void;
  locations: PairValue[];
  setLocations: (location: PairValue | number) => void;
  t: any;
  locale: string;
  locales: any;
  setLocale: (language: string) => void;
  isDay: boolean;
  setViewSelection: (view: Enums.EnumViewSelection) => void;
  currentDate: string;
  setCurrentDate: (currentDate: string) => void;
  isMetric: boolean;
  setMeasurement: (measurement: Enums.EnumMeasurementSystem) => void;
}

const initState = {
  locale: "EN",
  location: Weather.WEATHER_DEFAULT_LOCATION as PairValue,
  locations: Store.sessionStorage.get() as PairValue[],
  translations: Constants.LOCALE_STRINGS[Constants.REGIONS.EN],
  locales: Object.keys(Constants.REGIONS),
  viewSelection: Enums.EnumViewSelection.Day,
  currentDate: HDate.toISOString(new Date()),
  measurement: Enums.EnumMeasurementSystem.Metric,
};

export const AppContext = createContext<ProvidedValueType>({
  location: initState.location,
  setLocation: () => {},
  locations: initState.locations,
  setLocations: () => {},
  t: initState.translations,
  locale: initState.locale,
  locales: initState.locales,
  setLocale: () => {},
  isDay: true,
  setViewSelection: () => {},
  currentDate: initState.currentDate,
  setCurrentDate: () => {},
  isMetric: false,
  setMeasurement: () => {},
});

interface Props {
  initLocale: string;
  children?: React.ReactNode;
}

export const AppProvider = React.memo<Props>(
  ({ initLocale, children }: Props) => {
    const [location, setLocation] = React.useState<PairValue>(
      initState.locations.length > 0
        ? initState.locations[0]
        : initState.location
    );
    const [locations, setLocations] = React.useState<PairValue[]>(
      initState.locations
    );
    const [locale, setLocale] = React.useState<string>(initLocale);
    const [currentDate, setCurrentDate] = React.useState<string>(
      initState.currentDate
    );
    const [viewSelection, setViewSelection] =
      React.useState<Enums.EnumViewSelection>(initState.viewSelection);
    const [measurement, setMeasurement] =
      React.useState<Enums.EnumMeasurementSystem>(initState.measurement);

    const setLocationsCallback = React.useCallback(
      (newLocation: PairValue | number) => {
        let newLocations = locations;
        // if a number is provided, it should remove
        if (typeof newLocation === "number") {
          newLocations = newLocations.filter(
            (item: PairValue) => item.key !== newLocation
          );
        } else {
          // if a pair value is provided, it should add (If it does not exist)
          const index = newLocations.findIndex(
            (item: PairValue) => item.key === newLocation.key
          );
          if (index === -1) {
            newLocations.push(newLocation);
          }
          setLocation(newLocation);
        }
        setLocations(newLocations);
        Store.sessionStorage.set(newLocations);
      },
      []
    );

    const MemoizedValue = React.useMemo(() => {
      const value: ProvidedValueType = {
        locale,
        t: Constants.LOCALE_STRINGS[locale],
        locales: Constants.LOCALE_STRINGS[locale],
        setLocale,
        location,
        setLocation,
        locations,
        setLocations: setLocationsCallback,
        currentDate,
        setCurrentDate,
        isDay: viewSelection === Enums.EnumViewSelection.Day,
        setViewSelection,
        isMetric: measurement === Enums.EnumMeasurementSystem.Metric,
        setMeasurement,
      };
      return value;
    }, [
      locale,
      location,
      locations,
      setLocationsCallback,
      currentDate,
      viewSelection,
      measurement,
    ]);

    return (
      <AppContext.Provider value={MemoizedValue}>
        {children}
      </AppContext.Provider>
    );
  }
);

export const useApp = () => useContext(AppContext);
