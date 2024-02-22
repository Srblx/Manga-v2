import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const StyledStackForTitle = styled(Stack)({
  width: "100%",
  textAlign: "center",
  fontWeight: "bold",
});

export const StyledStackContentAllDetail = styled(Stack)({
  background: "rgba(204, 204, 204, 0.936)",
  borderRadius: "10px",
  flexDirection: "row",
  columnWidth: "10em",
  columnRule: "2px solid black",
  padding: ".5rem",
  margin: "5rem 1rem"
});

export const StyledDivRightColumn = styled("div")({
  flex: "1",
  textAlign: "center",
  padding: ".5rem",
  borderRight: "3px solid #d34040",
});

export const StyledDivLeftColumn = styled("div")({
  flex: "2",
  paddingLeft: ".7rem",
});

export const StyledCustomButton = styled("button")({
  background: "#2262f7",
  padding: "5px",
  border: "2px solid black",
  borderRadius: "5px",
  color: "white",
  fontSize: "large",
  marginTop: "1.5rem",
});
