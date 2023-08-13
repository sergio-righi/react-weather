import { useState } from "react";
import { Stack } from "@mui/material";
import { PairValue } from "types";
import { Custom } from "components";
import { useApp } from "contexts";

// icons
import {
  AddRounded,
  ArrowBackRounded,
  ArrowForwardRounded,
  DeleteOutlineRounded,
} from "@mui/icons-material";

type Props = {};

export const Navigation = (props: Props) => {
  const { location, locations, setLocation, setLocations } = useApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const hasDeleteButton =
    locations.findIndex((item: PairValue) => item.key === location.key) !== -1;

  const locationCount = locations.length;
  const formattedLocation = location.value.split(",")[0];

  function handlePrevClick() {
    const prevIndex =
      currentIndex - 1 >= 0 ? currentIndex - 1 : locationCount - 1;
    setLocation(locations[prevIndex]);
    setCurrentIndex(prevIndex);
  }

  function handleNextClick() {
    const nextIndex =
      currentIndex + 1 > locationCount - 1 ? 0 : currentIndex + 1;
    setLocation(locations[nextIndex]);
    setCurrentIndex(nextIndex);
  }

  function handleAddClick() {
    setLocations(location);
  }

  function handleDeleteClick() {
    setLocations(location.key);
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Custom.Typography variant="h5">{formattedLocation}</Custom.Typography>
      <Stack direction="row">
        {locationCount > 1 && (
          <>
            <Custom.IconButton onClick={handlePrevClick}>
              <ArrowBackRounded />
            </Custom.IconButton>
            <Custom.IconButton onClick={handleNextClick}>
              <ArrowForwardRounded />
            </Custom.IconButton>
          </>
        )}
        {!hasDeleteButton && (
          <Custom.IconButton onClick={handleAddClick}>
            <AddRounded />
          </Custom.IconButton>
        )}
        {hasDeleteButton && (
          <Custom.IconButton onClick={handleDeleteClick}>
            <DeleteOutlineRounded />
          </Custom.IconButton>
        )}
      </Stack>
    </Stack>
  );
};
