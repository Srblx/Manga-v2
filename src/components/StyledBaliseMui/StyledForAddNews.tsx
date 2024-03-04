import styled from "@emotion/styled";
import { Stack, TextField } from "@mui/material";

export const StyledStackContentTextField = styled(Stack)({
    marginTop: "10rem",
    background: "#000000b5",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    border: "solid .5rem white",
    borderRadius: "5px",
    padding: "3rem",
  });
  
  export const StyledTextFieldNews = styled(TextField)({
    background: "white",
    width: "75%",
    borderRadius: "3px",
    margin: "1.5rem",
  });
  
  export const StyledH1TitleFromAddNews = styled("h1")({
    color: "white",
    fontWeight: "bold",
    fontSize: "3rem",
    padding: "1rem 0 2rem 0",
  });