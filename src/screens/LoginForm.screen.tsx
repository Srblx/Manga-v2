import Stack from "@mui/material/Stack";
import { LabelCustom } from "../components/UnderComponents/LabelCustom.component";
import TextFieldCustom, {
  TextFielCustomPassword,
} from "../components/UnderComponents/TextFieldCustom.component";
import Grid from "@mui/material/Grid";
import { ButtonCustom } from "../components/UnderComponents/BtnCustom.component";
import {
  StyledH1TitleLoginForm,
  StyledLink,
  StyledParagrapheIfNotAccount,
  StyledSpanIfNotAccountGoToSignUp,
  StyledStackContentAllForm,
  StyledStackForm,
} from "../components/StyledBaliseMui/StyledForLoginForm";
import { useContext, useState } from "react";
import { FormLoginData } from "../interfaces/LoginSignUpInterface";
import { validateFormLogin } from "../utils/ValidForm";
import { RequiredField } from "../components/UnderComponents/RequireField.component";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";



export function LoginForm() {
  const [formData, setFormData] = useState<FormLoginData>({});
  const [error, setError] = useState<string>("");
  const {  setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (error: Error) => {
    setError(error.message || "An error occurred during login.");
  };

  const handleSuccess = (data: any) => {
    setError("");
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user)
    setTimeout(() => {
      localStorage.removeItem("accessToken");
    }, 3600000); //? 1 hour expiration
      navigate("/");
  };

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (userData: FormLoginData) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error("Login error: " + error.message);
      }
    },
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const handleSubmit = async () => {
    const isValid = validateFormLogin(formData, setError);
    if (isValid) {
      await loginUser(formData);
      setError("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <StyledStackContentAllForm spacing={8}>
      <StyledStackForm>
        <form onSubmit={handleFormSubmit}>
          <Stack
            sx={{ margin: "1.8rem" }}
            direction="column"
            alignItems="start"
          >
            <StyledH1TitleLoginForm>Login</StyledH1TitleLoginForm>
            <LabelCustom margin="2em 0 .1em 0">
              E-Mail address <RequiredField />
            </LabelCustom>
            <TextFieldCustom
              value={formData.email}
              onChange={handleChange}
              name="email"
              id="outlined-basic"
              variant="outlined"
              placeholder="E-mail address"
            />
            <LabelCustom margin="2em 0 .1em 0">
              Password <RequiredField />
            </LabelCustom>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <TextFielCustomPassword
                value={formData.password}
                onChange={handleChange}
                name="password"
                id="outlined-basic"
                variant="outlined"
                placeholder="Password"
              />
            </Grid>
          </Stack>
          {error && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: ".5rem",
              }}
            >
              {error}
            </div>
          )}
          <ButtonCustom
            type="submit"
            background="#0B51E7"
            hoverBackground="#E8614D"
            padding=".5rem 1.5rem .5rem 1.5rem"
            boxShadow="
              0px 10px 15px -3px rgba(161, 182, 245, 0.506),
              0px 4px 6px -2px rgba(103, 194, 254, 0.606),
              0px 5px 12px 4px rgba(120, 128, 220, 0.46)"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Logining..." : "Login"}
          </ButtonCustom>
          <StyledParagrapheIfNotAccount>
            You don't have an account ?{" "}
            <StyledSpanIfNotAccountGoToSignUp>
              <StyledLink to={`/signup`}>Sign up !</StyledLink>
            </StyledSpanIfNotAccountGoToSignUp>
          </StyledParagrapheIfNotAccount>
        </form>
      </StyledStackForm>
    </StyledStackContentAllForm>
  );
}