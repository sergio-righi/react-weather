import React, { useState } from "react";
import { useApp, useService } from "contexts";
import { Custom } from "components";
import { Constants } from "utils";
import { PairValue } from "types";
import { SearchApi } from "interfaces";

type Props = {};

export const Search = (props: Props) => {
  const { weather } = useService();
  const { setLocations, t } = useApp();
  const [results, setResults] = useState<Array<SearchApi>>([]);

  async function handleChange(
    event: React.SyntheticEvent<Element, Event>,
    value: PairValue | null
  ) {
    value && setLocations(value);
  }

  async function handleInputChange(
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) {
    if (value && value.length > Constants.QUERY_MIN_LENGTH) {
      setResults(await weather.search(value));
    }
  }

  return (
    <Custom.Autocomplete
      onChange={handleChange}
      onInputChange={handleInputChange}
      placeholder={t.placeholder.search_location}
      items={results.map(
        (item: SearchApi) =>
          ({
            key: item.id,
            value: `${item.name}, ${item.region} - ${item.country}`,
          } as PairValue)
      )}
    />
  );
};
