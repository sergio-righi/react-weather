import React from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Common, Custom } from "components";
import { useTheme } from "contexts";
import ExploreOffRoundedIcon from "@mui/icons-material/ExploreOffRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export const Error404: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        p: 3,
        backgroundColor: theme.palette.background.color,
      }}
    >
      <Common.GlassCard
        glowColor={theme.color.accent.color}
        sx={{
          p: 5,
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ExploreOffRoundedIcon
          sx={{ fontSize: 64, color: theme.color.accent.color, mb: 2 }}
        />
        <Custom.Typography
          fontSize={64}
          fontWeight="800"
          sx={{
            letterSpacing: "-0.04em",
            fontFamily: "'Space Grotesk', sans-serif",
            color: theme.color.accent.color,
            lineHeight: 1,
            mb: 1,
          }}
        >
          404
        </Custom.Typography>
        <Custom.Typography fontSize={18} fontWeight="700" mb={1}>
          Atmospheric Station Lost
        </Custom.Typography>
        <Custom.Typography
          fontSize={13}
          color={theme.palette.font.accent}
          mb={3}
          sx={{ maxWidth: 320 }}
        >
          The coordinates or radar sector you are looking for does not exist in our telemetry grid.
        </Custom.Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/")}
          sx={{
            px: 3,
            py: 1,
            borderRadius: `${theme.border.radius * theme.border.factor}px`,
            backgroundColor: theme.color.accent.color,
            color: "#FFF",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: theme.color.accent.color,
              opacity: 0.9,
            },
          }}
        >
          Return to Dashboard
        </Button>
      </Common.GlassCard>
    </Stack>
  );
};
