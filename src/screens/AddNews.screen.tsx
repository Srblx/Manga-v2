import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { AddNewsForm } from "../interfaces/NewsModel.interface";
import { validateFormAddNews } from "../utils/ValidForm.utils";
import { useMutation } from "@tanstack/react-query";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ApiAxios from "../utils/axios.api";
import { StyledH1 } from "../components/StyledBaliseMui/H1.styled";
import { ButtonCustom } from "../components/UnderComponents/BtnCustom.component";

const StyledStackContentTextField = styled(Stack)({
  marginTop: "7rem",
  background: "#000000b5",
  justifyContent: "center",
  alignItems: "center",
  width: "60%",
  border: "solid .5rem white",
  borderRadius: "5px",
  padding: "3rem",
});

const StyledTextFieldNews = styled(TextField)({
  background: "white",
  width: "75%",
  borderRadius: "3px",
  margin: "1.5rem",
});

const StyledH1TitleFromAddNews = styled("h1")({
  color: "white",
  fontWeight: "bold",
  fontSize: "3rem",
  padding: "1rem 0 2rem 0",
});

export function FormAddNews() {
  const [formData, setFormData] = useState<AddNewsForm>({});
  const [error, setError] = useState<string>("");
  const [succes, setSucces] = useState<string>("");
  const navigate = useNavigate();

  const handleError = (error: Error) => {
    setError(error.message || "An error occurred during login.");
  };

  const handleSuccess = () => {
    setSucces("News added with success !");
    navigate("/news");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate: addNews } = useMutation({
    mutationFn: async (newsData: AddNewsForm) => {
      try {
        const response = await ApiAxios.post("news", newsData);
        return response.data;
      } catch (error: any) {
        throw new Error("Add news: " + error.message);
      }
    },
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const handleSubmit = async () => {
    const isValid = validateFormAddNews(formData, setError);
    ("Form submitted");
    if (isValid) {
      await addNews(formData);
      setError("");
    }
  };

  return (
    <Stack
    sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <StyledH1>Add news </StyledH1>
      <StyledStackContentTextField>
        <StyledH1TitleFromAddNews>Add new news</StyledH1TitleFromAddNews>
        {/* <form onSubmit={handleSubmit}> */}
        <StyledTextFieldNews
          name="title"
          id="filled-basic"
          label="Title"
          placeholder="News title"
          variant="filled"
          value={formData.title}
          onChange={handleChange}
        />
        <StyledTextFieldNews
          name="content"
          id="filled-textarea"
          label="Description"
          placeholder="News description"
          multiline
          variant="filled"
          maxRows={6}
          value={formData.content}
          onChange={handleChange}
        />
        <StyledTextFieldNews
          name="imageUrl"
          value={formData.imageUrl}
          id="filled-basic"
          label="Image Url"
          placeholder="News image"
          variant="filled"
          onChange={handleChange}
        />
        <p style={{ color: "white" }}>{error}</p>
        <p style={{ color: "white" }}>{succes}</p>
        <ButtonCustom
          background={"green"}
          padding={"1rem"}
          onClick={handleSubmit}
        >
          Register news
        </ButtonCustom>
        {/* </form> */}
      </StyledStackContentTextField>
    </Stack>
  );
}
