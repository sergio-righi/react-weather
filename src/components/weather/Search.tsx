import React from "react";
import { useApp } from "contexts";
import { Custom } from "components";
import { SelectChangeEvent } from "@mui/material";
import { Constants } from "utils";

type Props = {};

export const Search = (props: Props) => {
  const { location, setLocation, t } = useApp();

  function handleChange(_: SelectChangeEvent<unknown>, child: React.ReactNode) {
    const { props } = child as any;
    if (props) {
      setLocation(props.value);
    }
  }

  return (
    <Custom.Select
      value={location}
      onChange={handleChange}
      placeholder="Search for a location"
      items={Object.values(Constants.LOCATIONS).map((item: string) => ({
        key: item,
        value: t.location[item],
      }))}
    />
  );
};
