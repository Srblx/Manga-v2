import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useMutation } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../components/Shared/BtnCustom.component";
import { LabelCustom } from "../components/Shared/LabelCustom.component";
import { RequiredField } from "../components/Shared/RequireField.component";
import TextFieldCustom, {
  TextFielCustomPassword,
} from "../components/Shared/TextFieldCustom.component";
import {
  StyledH1TitleLoginForm,
  StyledLink,
  StyledParagrapheIfNotAccount,
  StyledSpanIfNotAccountGoToSignUp,
  StyledStackContentAllForm,
  StyledStackForm,
} from "../components/StyledBaliseMui/LoginForm.styled";
import {
  CreateUserDto,
  FormSignUpData,
} from "../interfaces/LoginSignUp.interface";
import { validateFormSingUp } from "../utils/ValidForm.utils";
import { Pages } from "../utils/route.utils";
import { ApiRoutes, URL_BASE_NEST_SKELETON } from "../utils/routeApi.utils";

export function SignUpForm() {
  const [formData, setFormData] = useState<FormSignUpData>({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (error: Error) => {
    setError(error.message || "An error occurred during registration.");
  };

  const handleSuccess = () => {
    setError("");
    navigate(Pages.HOME);
  };

  const transformFormDataToDto = (formData: FormSignUpData): CreateUserDto => {
    const { ...userData } = formData;
    return { ...userData };
  };

  const { mutate: signUpUser, isPending } = useMutation({
    mutationFn: async (userData: FormSignUpData) => {
      try {
        delete userData.confirmPassword;
        const response = await axios.post(
          `${URL_BASE_NEST_SKELETON + ApiRoutes.REGISTER}`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) { // pour eviter le any 
          throw new Error("Registration error: " + error.message);
        }
        throw new Error("Registration error");
      }
    },
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const handleSubmit = async () => {
    const isValid = validateFormSingUp(formData, setError);
    if (isValid) {
      const userData = transformFormDataToDto(formData);
      await signUpUser(userData);
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
            <StyledH1TitleLoginForm>Sign up</StyledH1TitleLoginForm>
            <LabelCustom margin="2em 0 .1em 0">
              Lastname <RequiredField />
            </LabelCustom>
            <TextFieldCustom
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              id="outlined-basic-lastname"
              variant="outlined"
              placeholder="Lastname"
            />
            <LabelCustom margin="2em 0 .1em 0">
              Firstname <RequiredField />
            </LabelCustom>
            <TextFieldCustom
              value={formData.firstname}
              onChange={handleChange}
              name="firstname"
              id="outlined-basic-firstname"
              variant="outlined"
              placeholder="Firstname"
            />
            <LabelCustom margin="2em 0 .1em 0">
              E-Mail address <RequiredField />
            </LabelCustom>
            <TextFieldCustom
              value={formData.email}
              onChange={handleChange}
              name="email"
              id="outlined-basic-mail"
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
                id="outlined-basic-password"
                variant="outlined"
                placeholder="Password"
              />
            </Grid>
            <LabelCustom margin="2em 0 .1em 0">
              Confirm password <RequiredField />
            </LabelCustom>
            <TextFielCustomPassword
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              id="outlined-basic-cofirm-password"
              variant="outlined"
              placeholder="Confirm password"
            />
          </Stack>
          {error && (
            <div
              id="error_signup"
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
            id="sign_up_btn"
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
            {isPending ? "Signing Up..." : "Sign Up"}
          </ButtonCustom>
          <StyledParagrapheIfNotAccount>
            You already have an account ?{" "}
            <StyledSpanIfNotAccountGoToSignUp>
              <StyledLink to={Pages.HOME}>Connect !</StyledLink>
            </StyledSpanIfNotAccountGoToSignUp>
          </StyledParagrapheIfNotAccount>
        </form>
      </StyledStackForm>
    </StyledStackContentAllForm>
  );
}
