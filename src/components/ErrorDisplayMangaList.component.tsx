import { Stack, styled } from "@mui/material";

const StyledStackForErrorMessage = styled(Stack)({
  height: "100dvh",
  background: "white",
  padding: "20px",
});

export function ErrorDisplayManga({ error }: { error: string }) {
  return (
    <StyledStackForErrorMessage alignItems="center" justifyContent="center">
      <div>Error: {error}</div>
    </StyledStackForErrorMessage>
  );
}
