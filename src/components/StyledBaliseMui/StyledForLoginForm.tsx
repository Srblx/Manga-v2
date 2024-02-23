import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledSpanIfNotAccountGoToSignUp = styled("span")({
  color: "#FFFFFF",
  textDecoration: "underline",
  fontWeight: "bold",
});

export const StyledParagrapheIfNotAccount = styled("p")({
  fontSize: "12px",
  textAlign: "center",
  color: "#FFFFFF",
  fontFamily: "Youtube Sans",
  fontWeight: "lighter",
  marginTop: "2rem",
});

export const StyledParagrapheForgottenPassword = styled("p")({
  fontSize: "12px",
  color: "red",
  textDecoration: "underline",
  fontWeight: "bold",
  fontFamily: "Youtube Sans",
  marginTop: "8px",
});

export const StyledH1TitleLoginForm = styled("h1")({
  fontFamily: "YouTube Sans",
  fontSize: "22px",
  fontWeight: "bold",
  color: "#FFFFFF",
});

export const StyledStackForm = styled(Stack)({
  background: "#000000e9",
  borderRadius: "15px",
  padding: "2rem 0",
  width: "30%",
  border: "2px solid white "
});

export const StyledStackContentAllForm = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  height: "100dvh",
});

export const StyledLink = styled(Link)({
  color: "#0B51E7",
  "&:visited": {
    textDecoration: "none", 
  },
});