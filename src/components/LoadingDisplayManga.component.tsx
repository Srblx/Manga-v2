import { Box, CircularProgress } from "@mui/material";
import {
  StyledCustomStackForCircular,
  StyledCustomStackForLoading,
} from "../components/StyledBaliseMui/Loading.styled";

export function CircularColor() {
  return (
    <StyledCustomStackForCircular
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress color="success" />
    </StyledCustomStackForCircular>
  );
}

export function LoadingDisplayManga() {
  return (
    <Box sx={{ padding: "10px 30px", marginTop: "85px" }}>
      <StyledCustomStackForLoading>
        <CircularColor />
      </StyledCustomStackForLoading>
    </Box>
  );
}
