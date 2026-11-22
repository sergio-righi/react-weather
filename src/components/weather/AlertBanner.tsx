import React, { useState } from "react";
import { Stack, Box, Collapse, IconButton } from "@mui/material";
import { Common, Custom } from "components";
import { useApp, useTheme } from "contexts";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alerts?: any;
};

export const AlertBanner: React.FC<Props> = ({ alerts }) => {
  const { t } = useApp();
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const alertList = alerts?.alert || [];
  if (alertList.length === 0) return null;

  const firstAlert = alertList[0];
  const headline = firstAlert?.headline || firstAlert?.event || t.label.severe_alerts;
  const desc = firstAlert?.desc || firstAlert?.instruction || "";

  return (
    <Common.GlassCard
      glowColor={theme.color.status.error.color}
      sx={{
        p: theme.spacing.md,
        mb: theme.spacing.md,
        width: "100%",
        borderColor: `${theme.color.status.error.color}66`,
        backgroundColor: `${theme.color.status.error.color}15`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={theme.font.sm}>
          <Box
            sx={{
              p: theme.spacing.xs,
              borderRadius: theme.border.circle,
              backgroundColor: `${theme.color.status.error.color}25`,
              color: theme.color.status.error.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberRoundedIcon sx={{ fontSize: theme.font.md }} />
          </Box>
          <Stack spacing={theme.spacing.xxs}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Common.LuminousBadge
                label={t.label.severe_alerts}
                color={theme.color.status.error.color}
                pulse
                size="sm"
              />
              <Custom.Typography fontSize={theme.font.xs} fontWeight={theme.font.bold}>
                {headline}
              </Custom.Typography>
            </Stack>
          </Stack>
        </Stack>

        <IconButton
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{ color: theme.palette.font.accent }}
        >
          {expanded ? <KeyboardArrowUpRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
        </IconButton>
      </Stack>

      <Collapse in={expanded}>
        <Box sx={{ mt: theme.font.sm, pt: theme.font.sm, borderTop: `1px solid ${theme.palette.border}` }}>
          <Custom.Typography fontSize={theme.font.xs} color={theme.palette.font.color} sx={{ lineHeight: 1.6 }}>
            {desc || headline}
          </Custom.Typography>
        </Box>
      </Collapse>
    </Common.GlassCard>
  );
};
