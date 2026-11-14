import React, { useState, useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { useTheme } from "contexts";

type Props = {
  step?: number;
  centeredId: string;
  children: React.ReactNode;
};

export const HorizontalScroll: React.FC<Props> = ({ centeredId, children }) => {
  const { theme } = useTheme();
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

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
  }, [centeredId]);

  useEffect(() => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [scrollPosition]);

  function handleScroll(newPosition: number) {
    if (cardContainerRef.current) {
      const { offsetWidth, scrollWidth } = cardContainerRef.current;
      setScrollPosition(
        newPosition < 0
          ? 0
          : newPosition > scrollWidth - offsetWidth
          ? scrollWidth - offsetWidth
          : newPosition
      );
    }
  }

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
      handleScroll(scrollStart + deltaX);
    };

    const handleDragEnd = () => {
      if (cardContainerRef.current) {
        cardContainerRef.current.style.scrollBehavior = "smooth";
      }
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove);
    document.addEventListener("touchend", handleDragEnd);
  };

  return (
    <Stack width={1} direction="row" alignItems="center">
      <Stack
        direction="row"
        alignItems="center"
        ref={cardContainerRef}
        spacing={theme.margin.sm}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onScroll={(e: React.UIEvent<HTMLDivElement>) =>
          setScrollPosition(e.currentTarget.scrollLeft)
        }
        sx={{
          width: "100%",
          py: 1,
          px: 0.5,
          overflowX: "auto",
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
    </Stack>
  );
};
