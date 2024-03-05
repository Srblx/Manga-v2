import { Button, Stack } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export function ButtonCustom(props: any) {
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
      <Button
        onClick={props.onClick}
        startIcon={props.useLinkedInIcon ? <LinkedInIcon fontSize="large"/> : null}
        sx={{
          background: props.background || "black",
          fontFamily: "Youtube Sans",
          boxShadow: props.boxShadow || undefined,
          color: "#FFFFFF",
          fontSize: "15px",
          textTransform: "math-auto",
          fontWeight: "400",
          borderRadius: "15px",
          padding: props.padding,
          "&:hover": {
            background: props.background || "black",
            color: "#FFFFFF",
            boxShadow: props.boxShadow || undefined,
          },
        }}
      >
        {capitalizeFirstLetter(props.children)} 
        {/* // xCommx children est une props protégée par react qui peut etre un component, plutot utiliser "textContent" ou quelquechose du genre */}
      </Button>
    </Stack>
  );
}
