import "assets/scss/components/modal.scss";

import React, { useEffect, useState } from "react";
import { Box, IconButton, Modal as MUIModal } from "@mui/material";
import { useTheme } from "contexts";
import { Custom } from "components";
import { HValidation } from "helpers";

// icons
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type Props = {
  sx?: any;
  message?: string;
  header: string;
  opened: boolean;
  action?: React.ReactNode;
  subheader?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  onScroll?: (done: boolean) => void;
};

export const Modal = (props: Props) => {
  const { border, font, margin, palette } = useTheme();
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    if (props.opened) {
      props.onOpen && props.onOpen();
    }
  }, [props.opened]);

  const handleClose = (): void => {
    setOpened(false);
    props.onClose && props.onClose();
  };

  const handleBack = (): void => {
    setOpened(false);
    props.onBack && props.onBack();
  };

  // React.SyntheticEvent
  const handleScroll = (event: any): void => {
    const {
      scrollHeight = 0,
      scrollTop = 0,
      clientHeight = 0,
    } = event.target as HTMLDivElement;
    if (scrollHeight === Math.ceil(scrollTop + clientHeight)) {
      props.onScroll && props.onScroll(true);
    } else {
      props.onScroll && props.onScroll(false);
    }
  };

  return (
    <MUIModal open={props.opened} onClose={handleClose}>
      <Box className="al-modal" sx={props.sx}>
        <>
          {HValidation.hasValue(props.message) && (
            <Custom.Alert
              className="al-feedback"
              variant="filled"
              severity={"error"}
            >
              <Custom.Typography>{props.message}</Custom.Typography>
            </Custom.Alert>
          )}
          <Box
            sx={{
              color: palette.font.color,
              borderRadius: border.radius,
              backgroundColor: palette.theme,
            }}
            className="al-wrapper"
          >
            <Box
              className="al-header"
              sx={{
                display: "flex",
                alignItems: "center",
                px: margin.lg,
                pt: margin.lg,
              }}
            >
              {props.onBack && (
                <IconButton
                  sx={{
                    marginRight: margin.xs,
                    color: palette.font.color,
                  }}
                  onClick={handleBack}
                >
                  <ChevronLeftIcon />
                </IconButton>
              )}
              <Box component="div">
                <Custom.Typography
                  sx={{
                    fontWeight: font.normal,
                    fontSize: font.lg,
                  }}
                >
                  {props.header}
                </Custom.Typography>

                {props.subheader && (
                  <Custom.Typography
                    sx={{
                      fontSize: font.md,
                      fontWeight: font.normal,
                      color: palette.font.accent,
                    }}
                  >
                    {props.subheader}
                  </Custom.Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center" marginLeft="auto">
                {props.action && (
                  <Box sx={{ marginRight: margin.xs }}>{props.action}</Box>
                )}
                {props.onClose && (
                  <IconButton
                    sx={{
                      color: palette.font.color,
                    }}
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box
              className="al-content"
              sx={{
                pt: 0,
                padding: margin.lg,
              }}
              onScroll={handleScroll}
            >
              <Box className="al-wrapper">{props.children}</Box>
            </Box>
            {props.footer && (
              <Box
                className="al-footer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: margin.lg,
                }}
              >
                {props.footer}
              </Box>
            )}
          </Box>
        </>
      </Box>
    </MUIModal>
  );
};
