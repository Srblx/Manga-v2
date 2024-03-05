import { Button, Stack, TextField  } from "@mui/material";
import { useState } from "react";
import { AddNewsForm } from "../interfaces/NewsModel";
import { validateFormAddNews } from "../utils/ValidForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { requestInterceptor } from "./LoginSignUp/LoginForm.component";
import styled from "@emotion/styled";

 const StyledStackContentTextField = styled(Stack)({
    marginTop: "10rem",
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

  const handleError = (error: Error) => {
    setError(error.message || "An error occurred during login.");
  };

  const handleSuccess = () => {
    setSucces("News added with success !");
    window.location.href = "/news";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate: addNews/* , isPending */ } = useMutation({
    mutationFn: async (newsData: AddNewsForm) => {
      try {
        console.log('requestInterceptor : ', requestInterceptor);
        const response = await axios.post(
          "http://localhost:3000/api/v1/news",
          newsData,
        );
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
    console.log("Form submitted");
    if (isValid) {
      await addNews(formData);
      console.log('formData : ', formData);
      setError("");
    }
  };

  return (
    <Stack
      sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
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
          <p style={{color: "white"}}>{error}</p>
          <p style={{color: "white"}}>{succes}</p>
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: "2rem" }}
            onClick={handleSubmit}
          >
            Register news
          </Button>
        {/* </form> */}
      </StyledStackContentTextField>
    </Stack>
  );
}
