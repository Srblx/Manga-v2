import styled from "@emotion/styled";
import { IconButton, Stack } from "@mui/material";

export const StyledParagrapheContentTotalCart = styled("p")({
  color: "white",
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "2rem",
});

export const StyledForIconBtnDelete = styled(IconButton)({
  height: "100%",
  background: "red",
  border: "2px solid red",
  borderRadius: "0px 10px 10px 0px",
});

export const StyledStackForCardContentItemInCart = styled(Stack)({
  background: " #f4e2e2",
  padding: ".2rem",
  borderRadius: "10px",
  alignItems: "center",
});

export const StyledIconBtnCloseCart = styled(IconButton)({
  color: "white",
  background: "red",
  width: "100%",
  borderRadius: "0px 0px 10px 10px",
  padding: "65px 0px 5px 0px",
});

export const StyledIconButton = styled(IconButton)({
    alignItems: "flex-start",
    background: "black",
    border: "2px solid white",
    borderRadius: "10px",
    width: "100%",
    "&:hover": {
      background: "rgb(39, 39, 39);",
    },
  });