import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const StyledDivContentOneItem = styled("div")({
  background: "white",
  margin: "2rem",
  padding: ".5rem",
  border: "solid .35rem black",
  borderRadius: "10px",
  textAlign: "center",
  width: "50%",
});

export const StyledImgNews = styled("img")({
  maxWidth: "100%",
  height: "auto",
  borderRadius: "5px",
});

export const StyledStackContentDescription = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem 0",
});

export const StyledH1 = styled("h1")({
  width: "100%",
  background: "gray",
  marginTop: "4.5rem",
  textAlign: "center",
  padding: "2rem 0",
});

export const StyledStackContentItem = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  background: "#ffffffb5",
});
