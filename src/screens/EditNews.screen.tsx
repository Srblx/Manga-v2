import { useState } from "react";
import { TextFieldUpdateNews } from "../components/UnderComponents/InputCustom.component";
import { AddNewsForm } from "../interfaces/NewsModel.interface";
import { Stack } from "@mui/material";
import { ButtonCustom } from "../components/UnderComponents/BtnCustom.component";
import { StyledH1 } from "../components/StyledBaliseMui/H1.styled";
import { useParams } from "react-router-dom";

export function EditNews() {
  const [formData, setFormData] = useState<AddNewsForm>({});
  const { newId } = useParams();

  console.log("newsId : ", newId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <StyledH1>Update news </StyledH1>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Stack
          sx={{
            marginTop: "2.75rem",
            background: "#000000b5",
            width: "90%",
            border: "solid .5rem white",
            borderRadius: "5px",
            padding: "1.5rem",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextFieldUpdateNews
            id="update-title"
            name="updateTitle"
            label="Title"
            placeholder="Enter the updated title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextFieldUpdateNews
            id="update-content"
            name="updateContent"
            label="Content"
            placeholder="Enter the updated Content"
            value={formData.title}
            onChange={handleChange}
          />
          <TextFieldUpdateNews
            id="update-imageUrl"
            name="updateimage"
            label="Image"
            placeholder="Enter the updated image url"
            value={formData.title}
            onChange={handleChange}
          />
          <img
            src={
              "https://www.shutterstock.com/image-photo/great-horned-owl-staring-golden-260nw-75455761.jpg"
            }
            alt=""
            style={{
              margin: "2rem",
              border: "solid 5px white",
              borderRadius: "5px",
            }}
          />
          <ButtonCustom padding={"1rem"} background={"green"}>
            Update news
          </ButtonCustom>
        </Stack>
      </Stack>
    </>
  );
}
