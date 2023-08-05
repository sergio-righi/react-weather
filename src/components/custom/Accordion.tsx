import React, { useEffect, useState } from "react";
import { useTheme } from "context";
import {
  AccordionDetails,
  AccordionSummary,
  Accordion as MUIAccordion,
} from "@mui/material";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  expanded?: boolean;
  children: React.ReactNode;
  header?: React.ReactNode | string;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => void;
};

export const Accordion = (props: Props) => {
  const { color, palette } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(props.expanded ?? false);

  useEffect(() => setExpanded(props.expanded ?? false), [props.expanded]);

  function handleChange(
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) {
    setExpanded(expanded);
    props.onChange && props.onChange(event, expanded);
  }

  return (
    <MUIAccordion
      elevation={0}
      expanded={expanded}
      onChange={handleChange}
      sx={{
        borderWidth: expanded ? 2 : 1,
        borderStyle: "solid",
        borderColor: expanded ? color.accent.color : palette.input.accent,
        "&:hover": {
          borderColor: expanded ? color.accent.color : palette.font.color,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: palette.font.color }} />}
      >
        {props.header}
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </MUIAccordion>
  );
};
