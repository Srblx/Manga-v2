import Stack from "@mui/material/Stack";
import { LabelCustom } from "../UnderComponents/LabelCustom.component";
import TextFieldCustom from "../UnderComponents/TextFieldCustom.component";
import Grid from "@mui/material/Grid";
import { ButtonCustom } from "../UnderComponents/BtnCustom.component";
import {
  StyledH1TitleLoginForm,
  StyledLink,
  StyledParagrapheForgottenPassword,
  StyledParagrapheIfNotAccount,
  StyledSpanIfNotAccountGoToSignUp,
  StyledStackContentAllForm,
  StyledStackForm,
} from "../StyledBaliseMui/StyledForLoginForm";
import { useState } from "react";
import { FormLoginData } from "../../interfaces/LoginSignUpInterface";
import { validateFormLogin } from "../../utils/ValidForm";
import { RequiredField } from "../UnderComponents/RequireField.component";

export function LoginForm() {
  const [formData, setFormData] = useState<FormLoginData>({});
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const isValid = validateFormLogin(formData, setError);
    if (isValid) {
      console.log("formDataLogin : ", formData);
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
            <LabelCustom margin="2em 0 .1em 0">E-mail address <RequiredField/></LabelCustom>
            <TextFieldCustom
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="outlined-basic"
              variant="outlined"
              placeholder="E-mail address"
            />
            <LabelCustom margin="2em 0 .1em 0">Password <RequiredField/></LabelCustom>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <TextFieldCustom
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
                placeholder="Password"
              />
              <StyledParagrapheForgottenPassword>
                Password forgotten ?
              </StyledParagrapheForgottenPassword>
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
          >
            Login
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
