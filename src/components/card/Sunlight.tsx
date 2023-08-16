import { Stack } from "@mui/material";
import { Common, Custom } from "components";
import { ForecastApi } from "interfaces";
import { useApp, useTheme } from "contexts";
import { Sunset, Sunrise } from "assets/images";

type Props = {
  data: ForecastApi;
};

export const Sunlight = (props: Props) => {
  const { t } = useApp();
  const { theme } = useTheme();

  function parseTime(timeStr: string): Date {
    const [time, ampm] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    let hours24 = hours;
    if (ampm === "PM" && hours !== 12) {
      hours24 = hours + 12;
    } else if (ampm === "AM" && hours === 12) {
      hours24 = 0;
    }

    const date = new Date();
    date.setHours(hours24, minutes, 0, 0);
    return date;
  }

  function calculateTimeDifference(start: string, end: string): string {
    const startDate = parseTime(start);
    const endDate = parseTime(end);

    const timeDifferenceMillis = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours}h ${minutes}m`;
  }

  return (
    <Custom.Card sx={{ width: 1 }}>
      <Stack height={1} spacing={theme.margin.md}>
        <Custom.Typography variant="h5" color={theme.palette.font.accent}>
          {t.label.sunrise_sunset}
        </Custom.Typography>
        {props.data && props.data.astro && (
          <Stack height={1} spacing={theme.margin.md}>
            <Stack
              height={1}
              justifyContent="space-evenly"
              spacing={theme.margin.md}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Custom.Typography variant="h3">
                  {props.data.astro.sunrise}
                </Custom.Typography>
                <Common.Image
                  src={Sunrise}
                  width={48}
                  height={48}
                  alt={t.label.sunrise}
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Custom.Typography variant="h3">
                  {props.data.astro.sunset}
                </Custom.Typography>
                <Common.Image
                  src={Sunset}
                  width={48}
                  height={48}
                  alt={t.label.sunset}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={theme.margin.xs}>
              <Custom.Typography as="span" color={theme.palette.font.accent}>
                {t.label.daylight}
              </Custom.Typography>
              <Custom.Typography
                as="span"
                fontWeight={theme.font.bold}
                color={theme.color.accent.color}
              >
                {calculateTimeDifference(
                  props.data.astro.sunrise,
                  props.data.astro.sunset
                )}
              </Custom.Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Custom.Card>
  );
};
