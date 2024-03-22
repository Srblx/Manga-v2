import { Box, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { AddNewsForm } from "../interfaces/NewsModel.interface";
import { ButtonCustom } from "./Shared/BtnCustom.component";
import { TextFieldUpdateNews } from "./Shared/InputCustom.component";

interface UpdateNewsModalProps {
  open: boolean;
  onClose: () => void;
  formData: AddNewsForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image: string | undefined;
  handleSubmit: () => void;
}

const UpdateNewsModal: React.FC<UpdateNewsModalProps> = ({
  open,
  onClose,
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <Stack
            sx={{
              background: "#000000b5",
              width: "90%",
              border: "solid .5rem white",
              borderRadius: "5px",
              padding: "1.5rem",
            }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "white" }}
            >
              UPDATE NEWS 
            </Typography>
            <TextFieldUpdateNews
              id="update-title"
              name="title"
              label="Title"
              placeholder="Enter the updated title"
              value={formData.title}
              onChange={handleChange}
            />
            <TextFieldUpdateNews
              id="update-content"
              name="content"
              label="Content"
              maxRows={6}
              numberRow={3}
              placeholder="Enter the updated Content"
              value={formData.content}
              onChange={handleChange}
            />
            <TextFieldUpdateNews
              id="update-imageUrl"
              data-testid="update-imageUrl"
              name="image"
              label="Image"
              placeholder="Enter the updated image url"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            <img
              src={formData.imageUrl}
              alt=""
              style={{
                margin: "2rem",
                border: "solid 5px white",
                borderRadius: "5px",
                width: "auto",
                height: "250px",
              }}
            />
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"space-between"}
              width="100%"
            >
              <ButtonCustom
                padding={"1rem"}
                background={"rgba(255, 255, 255, 0)"}
                onClick={onClose}
              >
                Cancel
              </ButtonCustom>
              <ButtonCustom
                id="validate_update"
                padding={"1rem"}
                background={"green"}
                onClick={handleSubmit}
              >
                Update news
              </ButtonCustom>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdateNewsModal;
