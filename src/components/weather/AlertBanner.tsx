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
        p: 2,
        mb: 2,
        width: "100%",
        borderColor: `${theme.color.status.error.color}66`,
        background: `linear-gradient(90deg, ${theme.color.status.error.color}15 0%, rgba(15, 23, 42, 0.6) 100%)`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              p: 0.75,
              borderRadius: "50%",
              backgroundColor: `${theme.color.status.error.color}25`,
              color: theme.color.status.error.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Stack spacing={0.25}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Common.LuminousBadge
                label={t.label.severe_alerts}
                color={theme.color.status.error.color}
                pulse
                size="sm"
              />
              <Custom.Typography fontSize={13} fontWeight="700">
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
        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: `1px solid ${theme.palette.border}` }}>
          <Custom.Typography fontSize={12} color={theme.palette.font.color} sx={{ lineHeight: 1.6 }}>
            {desc || headline}
          </Custom.Typography>
        </Box>
      </Collapse>
    </Common.GlassCard>
  );
};
