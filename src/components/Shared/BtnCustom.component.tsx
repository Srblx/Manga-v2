import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Button, Stack, SvgIconTypeMap, SxProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface PropsCustom {
  onClick?: () => void;
  useLinkedInIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  background?: string;
  boxShadow?: string;
  padding?: string;
  children: string;
  type?: "submit" | "reset" | "button" | undefined;
  hoverBackground?: string;
  hoverBoxShadow?: string;
  disabled?: boolean;
  data?: string;
  id?: string;
}

export function ButtonCustom(props: PropsCustom) {
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  const {
    children,
    onClick,
    useLinkedInIcon,
    background,
    boxShadow,
    padding,
    type,
    hoverBackground,
    hoverBoxShadow,
    disabled,
  } = props;

  const ssx: Partial<SxProps> = {
    background: background || "black",
    fontFamily: "Youtube Sans",
    boxShadow: boxShadow || undefined,
    color: "#FFFFFF",
    fontSize: "18px",
    textTransform: "math-auto",
    fontWeight: "400",
    borderRadius: "15px",
    padding: padding,
    "&:hover": {
      background: hoverBackground || "black",
      color: "#FFFFFF",
      boxShadow: hoverBoxShadow || undefined,
    },
  };
  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
      <Button
        datatype={props.data}
        id={props.id}
        type={type}
        onClick={onClick}
        startIcon={useLinkedInIcon ? <LinkedInIcon fontSize="large" /> : null}
        disabled={disabled}
        sx={ssx}
      >
        {capitalizeFirstLetter(children)}
      </Button>
    </Stack>
  );
}
