import styled from "@emotion/styled";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button"
import { Link } from "react-router-dom";

export const StyledMangaCard = styled(Card)({
  height: "450px",
  maxWidth: 345,
  margin: "10px",
  transition: "background-color 0.3s",
});

export const StyledMangaCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
});

export const StyledButtonAddToCart = styled(Button)({
  textTransform: "capitalize",
  fontWeight: "bold",
});

export const StyledSpanPrice = styled("span")({
  fontSize: "18px",
  color: "#2B7BD4",
  marginLeft: "10px",
});

export const StyledStackContentBtnReadMore = styled(Stack)({
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "flex-end",
});

export const StyledStackForAddToCart = styled(Stack)({
  marginTop: ".2rem",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
});

export const StyledTypographyForInfoMangaInCard = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineClamp: 6, WebkitLineClamp: 6,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

export const StyledLinkForReadMoreInfo = styled(Link)({
  color: "green",
  fontWeight: "bold",
  textTransform: "capitalize",
  textDecoration: "underline",
  fontSize: "1.2rem",
  padding: "5px 0px"
  
});
