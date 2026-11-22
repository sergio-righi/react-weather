import React from "react";
import { Stack } from "@mui/material";
import { useTheme } from "contexts";
import { Common, Custom, Weather } from "components";
import { HDate } from "helpers";
import { HourApi } from "interfaces";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";

type Props = {
  id: string;
  item: HourApi;
  isActive?: boolean;
  onSelect?: () => void;
};

export const Hour: React.FC<Props> = ({ id, item, isActive = false, onSelect }) => {
  const { theme } = useTheme();

  const formattedTime = item?.time
    ? HDate.toTimeAmPmString(HDate.toSeconds(new Date(item.time)), false)
    : "";

  return (
    <Common.GlassCard
      id={id}
      onClick={onSelect}
      interactive
      glowColor={isActive ? theme.color.accent.color : undefined}
      sx={{
        minWidth: 104,
        p: theme.spacing.md,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderColor: isActive ? theme.color.accent.color : theme.palette.border,
        boxShadow: "none",
        backgroundColor: isActive
          ? `${theme.color.accent.color}15`
          : undefined,
      }}
    >
      <Stack spacing={theme.spacing.sm} alignItems="center">
        {/* Hour Header */}
        <Custom.Typography
          fontSize={theme.font.xs}
          fontWeight={isActive ? theme.font.bold : theme.font.medium}
          color={isActive ? theme.color.accent.color : theme.palette.font.accent}
        >
          {formattedTime}
        </Custom.Typography>

        {/* 3D Condition Icon */}
        <Weather.Icon condition={item.condition} />

        {/* Temperature Reading */}
        <Weather.Temperature
          size="sm"
          tempC={item.temp_c}
          tempF={item.temp_f}
        />

        {/* Precipitation Indicator */}
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xxs}>
          {item.chance_of_snow > 0 ? (
            <>
              <AcUnitRoundedIcon sx={{ color: theme.color.status.info.color, fontSize: theme.font.xs }} />
              <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
                {item.chance_of_snow}%
              </Custom.Typography>
            </>
          ) : (
            <>
              <WaterDropRoundedIcon
                sx={{
                  color: item.chance_of_rain > 0 ? theme.color.accent.color : theme.palette.font.accent,
                  fontSize: theme.font.xs,
                }}
              />
              <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
                {item.chance_of_rain}%
              </Custom.Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Common.GlassCard>
  );
};
