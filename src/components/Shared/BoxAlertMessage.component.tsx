import { Box, Button, Modal, Typography } from "@mui/material";

interface AlertMessageDeleteNews {
  handleCloseModal: () => void;
  handleDeleteNews: () => void;
  openModal: boolean;
}

export function AlertAuthorizeDeleteNews({
  openModal,
  handleCloseModal,
  handleDeleteNews,
}: AlertMessageDeleteNews) {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          <strong>Are you sure you want to delete this news?</strong>
        </Typography>
        <Button
          variant="contained"
          sx={{ background: "red", margin: ".8rem .5rem" }}
          onClick={() => {
            handleDeleteNews();
            handleCloseModal();
          }}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          sx={{ background: "blue", margin: ".8rem .5rem" }}
          onClick={handleCloseModal}
        >
          No
        </Button>
      </Box>
    </Modal>
  );
}
