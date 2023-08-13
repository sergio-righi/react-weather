import { Card as MUICard, CardContent, CardProps } from "@mui/material";
import { useTheme } from "contexts";

type Props = CardProps & {};

export const Card = (props: Props) => {
  const { theme } = useTheme();

  return (
    <MUICard
      {...props}
      sx={{
        height: 1,
        color: theme.palette.font.color,
        borderRadius: theme.border.radius,
        backgroundColor: theme.palette.theme,
        ...props.sx,
      }}
      elevation={0}
    >
      <CardContent sx={{ height: 1 }}>{props.children}</CardContent>
    </MUICard>
  );
};
