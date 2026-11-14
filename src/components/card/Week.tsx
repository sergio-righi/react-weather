import React from "react";
import { Stack, Box } from "@mui/material";
import { useApp, useTheme } from "contexts";
import { Common, Custom, Weather } from "components";
import { HDate } from "helpers";
import { ForecastApi } from "interfaces";
import { SoundEngine } from "utils/audio";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";

type Props = {
  item: ForecastApi;
  selected: boolean;
  onClick?: (value: string) => void;
};

export const Week: React.FC<Props> = ({ item, selected, onClick }) => {
  const { theme } = useTheme();
  const { locale, setCurrentDate, t } = useApp();

  const formattedDate = item?.date
    ? HDate.toRelativeDate(item.date, t.relative_date, locale)
    : "";

  const handleClick = () => {
    SoundEngine.playTactileClick();
    setCurrentDate(item.date);
    onClick?.(item.date);
  };

  const day = item?.day;
  const isRain = Boolean(day?.daily_chance_of_rain && day.daily_chance_of_rain > 0);
  const isSnow = Boolean(day?.daily_chance_of_snow && day.daily_chance_of_snow > 0);
  const precipChance = isSnow ? day?.daily_chance_of_snow : day?.daily_chance_of_rain;

  return (
    <Common.GlassCard
      onClick={handleClick}
      interactive
      glowColor={selected ? theme.color.accent.color : undefined}
      sx={{
        p: 2,
        cursor: "pointer",
        borderColor: selected ? theme.color.accent.color : theme.palette.border,
        boxShadow: selected
          ? `0 0 20px -4px ${theme.color.accent.color}55, 0 1px 1px 0 rgba(255, 255, 255, 0.15) inset`
          : undefined,
        background: selected
          ? `linear-gradient(135deg, ${theme.palette.theme} 0%, ${theme.color.accent.color}15 100%)`
          : undefined,
      }}
    >
      <Stack spacing={1.5} alignItems="center">
        {/* Date Label & Selected Pip */}
        <Stack direction="row" alignItems="center" spacing={0.75}>
          {selected && (
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: theme.color.accent.color,
                boxShadow: `0 0 8px ${theme.color.accent.color}`,
              }}
            />
          )}
          <Custom.Typography
            fontSize={14}
            fontWeight={selected ? "700" : "600"}
            color={selected ? theme.color.accent.color : theme.palette.font.color}
          >
            {formattedDate}
          </Custom.Typography>
        </Stack>

        {/* 3D Weather Icon */}
        <Weather.Icon condition={day?.condition} />

        {/* High / Low Temperature Badges */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Weather.Temperature
            size="md"
            tempC={day?.maxtemp_c}
            tempF={day?.maxtemp_f}
          />
          <Weather.Temperature
            size="sm"
            color={theme.palette.font.accent}
            tempC={day?.mintemp_c}
            tempF={day?.mintemp_f}
          />
        </Stack>

        {/* Precipitation / Condition status */}
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ minHeight: 20 }}>
          {isRain || isSnow ? (
            <>
              {isSnow ? (
                <AcUnitRoundedIcon sx={{ color: "#38BDF8", fontSize: 13 }} />
              ) : (
                <WaterDropRoundedIcon sx={{ color: theme.color.accent.color, fontSize: 13 }} />
              )}
              <Custom.Typography fontSize={11} fontWeight="600" color={theme.palette.font.accent}>
                {precipChance}%
              </Custom.Typography>
            </>
          ) : (
            <Custom.Typography fontSize={11} color={theme.palette.font.accent}>
              {day?.condition?.text || t.message.weather.not_raining_snowing}
            </Custom.Typography>
          )}
        </Stack>
      </Stack>
    </Common.GlassCard>
  );
};
