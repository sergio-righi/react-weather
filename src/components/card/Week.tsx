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
        p: theme.spacing.md,
        cursor: "pointer",
        borderColor: selected ? theme.color.accent.color : theme.palette.border,
        boxShadow: "none",
        backgroundColor: selected
          ? `${theme.color.accent.color}15`
          : undefined,
      }}
    >
      <Stack spacing={theme.spacing.sm} alignItems="center">
        {/* Date Label & Selected Pip */}
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xs}>
          {selected && (
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: theme.border.circle,
                backgroundColor: theme.color.accent.color,
                boxShadow: `0 0 8px ${theme.color.accent.color}`,
              }}
            />
          )}
          <Custom.Typography
            fontSize={theme.font.xs}
            fontWeight={selected ? theme.font.bold : theme.font.semiBold}
            color={selected ? theme.color.accent.color : theme.palette.font.color}
          >
            {formattedDate}
          </Custom.Typography>
        </Stack>

        {/* 3D Weather Icon */}
        <Weather.Icon condition={day?.condition} />

        {/* High / Low Temperature Badges with Indicators and Text Labels */}
        <Stack direction="row" alignItems="center" spacing={theme.font.sm}>
          {/* Max Temperature with high label & indicator */}
          <Stack direction="row" alignItems="center" spacing={theme.spacing.xxs}>
            <Custom.Typography
              fontSize={theme.font.xxs}
              fontWeight={theme.font.bold}
              color={theme.color.status.warning.color}
              sx={{ textTransform: "uppercase", letterSpacing: "0.03em" }}
            >
              H
            </Custom.Typography>
            <Weather.Temperature
              size="md"
              tempC={day?.maxtemp_c}
              tempF={day?.maxtemp_f}
            />
          </Stack>

          {/* Min Temperature with low label & indicator */}
          <Stack direction="row" alignItems="center" spacing={theme.spacing.xxs}>
            <Custom.Typography
              fontSize={theme.font.xxs}
              fontWeight={theme.font.bold}
              color={theme.palette.font.accent}
              sx={{ textTransform: "uppercase", letterSpacing: "0.03em" }}
            >
              L
            </Custom.Typography>
            <Weather.Temperature
              size="sm"
              color={theme.palette.font.accent}
              tempC={day?.mintemp_c}
              tempF={day?.mintemp_f}
            />
          </Stack>
        </Stack>

        {/* Precipitation / Condition status */}
        <Stack direction="row" alignItems="center" spacing={theme.spacing.xxs} sx={{ minHeight: 20 }}>
          {isRain || isSnow ? (
            <>
              {isSnow ? (
                <AcUnitRoundedIcon sx={{ color: theme.color.status.info.color, fontSize: theme.font.xs }} />
              ) : (
                <WaterDropRoundedIcon sx={{ color: theme.color.accent.color, fontSize: theme.font.xs }} />
              )}
              <Custom.Typography fontSize={theme.font.xxs} fontWeight={theme.font.semiBold} color={theme.palette.font.accent}>
                {precipChance}%
              </Custom.Typography>
            </>
          ) : (
            <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.accent}>
              {day?.condition?.text || t.message.weather.not_raining_snowing}
            </Custom.Typography>
          )}
        </Stack>
      </Stack>
    </Common.GlassCard>
  );
};
