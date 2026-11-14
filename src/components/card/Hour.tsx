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
        p: 1.75,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderColor: isActive ? theme.color.accent.color : theme.palette.border,
        boxShadow: isActive
          ? `0 0 16px -2px ${theme.color.accent.color}44, 0 1px 1px 0 rgba(255, 255, 255, 0.15) inset`
          : undefined,
        background: isActive
          ? `linear-gradient(180deg, ${theme.palette.theme} 0%, ${theme.color.accent.color}18 100%)`
          : undefined,
      }}
    >
      <Stack spacing={1.25} alignItems="center">
        {/* Hour Header */}
        <Custom.Typography
          fontSize={12}
          fontWeight={isActive ? "700" : "500"}
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
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {item.chance_of_snow > 0 ? (
            <>
              <AcUnitRoundedIcon sx={{ color: "#38BDF8", fontSize: 11 }} />
              <Custom.Typography fontSize={10} color={theme.palette.font.accent}>
                {item.chance_of_snow}%
              </Custom.Typography>
            </>
          ) : (
            <>
              <WaterDropRoundedIcon
                sx={{
                  color: item.chance_of_rain > 0 ? theme.color.accent.color : theme.palette.font.accent,
                  fontSize: 11,
                }}
              />
              <Custom.Typography fontSize={10} color={theme.palette.font.accent}>
                {item.chance_of_rain}%
              </Custom.Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Common.GlassCard>
  );
};
