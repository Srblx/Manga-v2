import Stack from "@mui/material/Stack";
import { LabelCustom } from "../UnderComponents/LabelCustom.component";
import TextFieldCustom, { TextFielCustomPassword } from "../UnderComponents/TextFieldCustom.component";
import Grid from "@mui/material/Grid";
import { ButtonCustom } from "../UnderComponents/BtnCustom.component";
import {
  StyledH1TitleLoginForm,
  StyledLink,
  StyledParagrapheIfNotAccount,
  StyledSpanIfNotAccountGoToSignUp,
  StyledStackContentAllForm,
  StyledStackForm,
} from "../StyledBaliseMui/StyledForLoginForm";
import { useState } from "react";
import {
  CreateUserDto,
  FormSignUpData,
} from "../../interfaces/LoginSignUpInterface";
import { validateFormSingUp } from "../../utils/ValidForm";
import { RequiredField } from "../UnderComponents/RequireField.component";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function SignUpForm() {
  const [formData, setFormData] = useState<FormSignUpData>({});
  const [error, setError] = useState<string>("");

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

  const handleSuccess = (/* data: any */) => {
    setError("");
    // console.log("User registered successfully:", data);
    window.location.href = "/login";
  };

  const transformFormDataToDto = (formData: FormSignUpData): CreateUserDto => {
    const { confirmPassword, ...userData } = formData;
    return { ...userData, role: "USER" };
  };

  const { mutate: signUpUser, isPending } = useMutation({
    mutationFn: async (userData: CreateUserDto) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/register/",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error: any) {
        throw new Error("Registration error: " + error.message);
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
      // console.log('userData : ', userData);
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
              id="outlined-basic"
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
              id="outlined-basic"
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
            <LabelCustom margin="2em 0 .1em 0">
              Confirm password <RequiredField />
            </LabelCustom>
            <TextFielCustomPassword
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              id="outlined-basic"
              variant="outlined"
              placeholder="Confirm password"
            />
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
            {isPending ? "Signing Up..." : "Sign Up"}
          </ButtonCustom>
          <StyledParagrapheIfNotAccount>
            You already have an account ?{" "}
            <StyledSpanIfNotAccountGoToSignUp>
              <StyledLink to={`/login`}>Connect !</StyledLink>
            </StyledSpanIfNotAccountGoToSignUp>
          </StyledParagrapheIfNotAccount>
        </form>
      </StyledStackForm>
    </StyledStackContentAllForm>
  );
}
