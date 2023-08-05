import { Avatar as MUIAvatar } from "@mui/material";
import { useTheme } from "context";

type Props = {
  sx?: any;
  bg?: string;
  name?: string;
  color?: string;
  small?: boolean;
};

export const Avatar = (props: Props) => {
  const { color, font } = useTheme();
  const letter = props.name ? props.name[0] : "?";

  const size = props.small ? { width: 24, height: 24, fontSize: font.sm } : {};

  return (
    <MUIAvatar
      sx={{
        ...size,
        textTransform: "uppercase",
        color: props.color ?? color.primary.text,
        backgroundColor: props.bg ?? color.primary.color,
      }}
    >
      {letter}
    </MUIAvatar>
  );
};
