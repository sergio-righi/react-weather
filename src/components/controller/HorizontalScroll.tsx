import React, { useState, useEffect, useRef, useCallback } from "react";
import { Stack, Box, IconButton } from "@mui/material";
import { useTheme } from "contexts";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

type Props = {
  step?: number;
  centeredId: string;
  children: React.ReactNode;
};

export const HorizontalScroll: React.FC<Props> = ({ step = 200, centeredId, children }) => {
  const { theme } = useTheme();
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const updateScrollState = () => {
    if (cardContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = useCallback((newPosition: number) => {
    if (cardContainerRef.current) {
      const { offsetWidth, scrollWidth } = cardContainerRef.current;
      const target =
        newPosition < 0
          ? 0
          : newPosition > scrollWidth - offsetWidth
          ? scrollWidth - offsetWidth
          : newPosition;
      cardContainerRef.current.scrollTo({
        left: target,
        behavior: "smooth",
      });
      setTimeout(updateScrollState, 350);
    }
  }, []);

  useEffect(() => {
    if (centeredId && cardContainerRef.current) {
      const centeredCardElement = cardContainerRef.current.querySelector(
        `#${centeredId}`
      ) as HTMLElement | null;
      if (centeredCardElement) {
        const containerWidth = cardContainerRef.current.clientWidth;
        const cardPosition = centeredCardElement.offsetLeft;
        const cardWidth = centeredCardElement.clientWidth;
        const targetScroll = cardPosition - containerWidth / 2 + cardWidth / 2;
        handleScroll(targetScroll);
      }
    }
  }, [centeredId, handleScroll]);

  useEffect(() => {
    updateScrollState();
  }, [children]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (cardContainerRef.current) {
      const current = cardContainerRef.current.scrollLeft;
      const shift = direction === "left" ? -step : step;
      handleScroll(current + shift);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cardContainerRef.current) return;
    cardContainerRef.current.style.scrollBehavior = "auto";
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const startX = clientX;
    const scrollStart = cardContainerRef.current.scrollLeft;

    const handleDragMove = (event: MouseEvent | TouchEvent) => {
      const currentX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const deltaX = startX - currentX;
      if (cardContainerRef.current) {
        cardContainerRef.current.scrollLeft = scrollStart + deltaX;
        updateScrollState();
      }
    };

    const handleDragEnd = () => {
      if (cardContainerRef.current) {
        cardContainerRef.current.style.scrollBehavior = "smooth";
        updateScrollState();
      }
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };

    if ("touches" in e) {
      document.addEventListener("touchmove", handleDragMove, { passive: true });
      document.addEventListener("touchend", handleDragEnd, { passive: true });
    } else {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
      {/* Desktop Left Scroll Arrow */}
      {canScrollLeft && (
        <IconButton
          aria-label="Scroll left"
          onClick={() => scrollByAmount("left")}
          sx={{
            display: { xs: "none", md: "inline-flex" },
            position: "absolute",
            left: -14,
            zIndex: 10,
            width: 32,
            height: 32,
            backgroundColor: theme.palette.theme,
            border: `1px solid ${theme.palette.border}`,
            color: theme.palette.font.color,
            boxShadow: `0 2px 8px rgba(0, 0, 0, 0.15)`,
            "&:hover": {
              backgroundColor: theme.color.accent.color,
              color: "#FFF",
            },
          }}
        >
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>
      )}

      {/* Card List Container */}
      <Stack
        direction="row"
        alignItems="center"
        ref={cardContainerRef}
        spacing={theme.spacing.sm}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onScroll={updateScrollState}
        sx={{
          width: "100%",
          py: theme.spacing.xs,
          px: theme.spacing.xxs,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: { xs: "x mandatory", sm: "none" },
          "& > *": {
            scrollSnapAlign: { xs: "center", sm: "none" },
          },
          scrollBehavior: "smooth",
          userSelect: "none",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {children}
      </Stack>

      {/* Desktop Right Scroll Arrow */}
      {canScrollRight && (
        <IconButton
          aria-label="Scroll right"
          onClick={() => scrollByAmount("right")}
          sx={{
            display: { xs: "none", md: "inline-flex" },
            position: "absolute",
            right: -14,
            zIndex: 10,
            width: 32,
            height: 32,
            backgroundColor: theme.palette.theme,
            border: `1px solid ${theme.palette.border}`,
            color: theme.palette.font.color,
            boxShadow: `0 2px 8px rgba(0, 0, 0, 0.15)`,
            "&:hover": {
              backgroundColor: theme.color.accent.color,
              color: "#FFF",
            },
          }}
        >
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
