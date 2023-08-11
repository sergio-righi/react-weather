import React, { createContext, useContext } from "react";
import { Constants, Enums, Weather } from "utils";

interface ProvidedValueType {
  location: string;
  setLocation: (location: string) => void;
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
  location: Weather.LOCATIONS.TORONTO,
  translations: Constants.LOCALE_STRINGS[Constants.REGIONS.EN],
  locales: Object.keys(Constants.REGIONS),
  viewSelection: Enums.EnumViewSelection.Day,
  currentDate: "2023-08-06",
  measurement: Enums.EnumMeasurementSystem.Metric,
};

export const AppContext = createContext<ProvidedValueType>({
  location: initState.location,
  setLocation: () => {},
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
    const [location, setLocation] = React.useState<string>(initState.location);
    const [locale, setLocale] = React.useState<string>(initLocale);
    const [currentDate, setCurrentDate] = React.useState<string>(
      initState.currentDate
    );
    const [viewSelection, setViewSelection] =
      React.useState<Enums.EnumViewSelection>(initState.viewSelection);
    const [measurement, setMeasurement] =
      React.useState<Enums.EnumMeasurementSystem>(initState.measurement);

    const setLocationCallback = React.useCallback((newLocation: string) => {
      setLocation((currentLocation: string) =>
        currentLocation === newLocation ? currentLocation : newLocation
      );
    }, []);

    const setLocaleCallback = React.useCallback((newLocale: string) => {
      setLocale((currentLocale: string) =>
        currentLocale === newLocale ? currentLocale : newLocale
      );
    }, []);

    const setCurrentDateCallback = React.useCallback((newDate: string) => {
      setCurrentDate((currentDate: string) => newDate);
    }, []);

    const setViewSelectionCallback = React.useCallback(
      (newViewSelection: Enums.EnumViewSelection) => {
        setViewSelection(
          (viewSelection: Enums.EnumViewSelection) => newViewSelection
        );
      },
      []
    );

    const setMeasurementCallback = React.useCallback(
      (newMeasurement: Enums.EnumMeasurementSystem) => {
        setMeasurement(
          (currentMeasurement: Enums.EnumMeasurementSystem) => newMeasurement
        );
      },
      []
    );

    const MemoizedValue = React.useMemo(() => {
      const value: ProvidedValueType = {
        locale,
        t: Constants.LOCALE_STRINGS[locale],
        locales: Constants.LOCALE_STRINGS[locale],
        setLocale: setLocaleCallback,
        location,
        setLocation: setLocationCallback,
        currentDate,
        setCurrentDate: setCurrentDateCallback,
        isDay: viewSelection === Enums.EnumViewSelection.Day,
        setViewSelection: setViewSelectionCallback,
        isMetric: measurement === Enums.EnumMeasurementSystem.Metric,
        setMeasurement: setMeasurementCallback,
      };
      return value;
    }, [
      locale,
      setLocaleCallback,
      location,
      setLocationCallback,
      currentDate,
      setCurrentDateCallback,
      viewSelection,
      setViewSelectionCallback,
      measurement,
      setMeasurementCallback,
    ]);

    return (
      <AppContext.Provider value={MemoizedValue}>
        {children}
      </AppContext.Provider>
    );
  }
);

export const useApp = () => useContext(AppContext);
