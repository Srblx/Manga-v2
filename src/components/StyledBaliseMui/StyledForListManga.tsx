import { Box, Stack, styled } from "@mui/material";

export const StyledStackForAllCardManga = styled(Stack)({
  justifyContent: "center",
  margin: "15px",
  padding: "10px 10px",
});

export const StyledDivContentMangaCard = styled("div")({
  border: "solid 4px white",
  margin: "2px",
  borderRadius: "10px",
});

export const Styledh1ForListManga = styled("h1")({
  marginTop: "4.5rem",
  color: "black",
  paddingTop: "1rem",
  // textTransform: "uppercase",
  background: "white",
  width: "100%",
  textAlign: "center",
});

export const StyledStackContentBoxSearchBar = styled(Stack)({
  background: "gray",
  padding: ".5rem",
  width: "50%",
  display: "contents",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledBoxContentSearchBar = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "2rem auto ",
  alignItems: "center",
  background: "white",
  paddingLeft: ".5rem",
  borderRadius: "15px",
  width: "50%",
});

export const StyledDivContentBtnScrollToTop = styled("div")({
  position: "fixed",
  bottom: "2rem",
  right: "1rem",
});
