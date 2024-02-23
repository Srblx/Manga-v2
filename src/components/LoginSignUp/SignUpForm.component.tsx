import Stack from "@mui/material/Stack";
import { LabelCustom } from "../UnderComponents/LabelCustom.component";
import TextFieldCustom from "../UnderComponents/TextFieldCustom.component";
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
import { FormSignUpData } from "../../interfaces/LoginSignUpInterface";
import { validateFormSingUp } from "../../utils/ValidForm";
import { RequiredField } from "../UnderComponents/RequireField.component";

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

  const handleSubmit = () => {
    const isValid = validateFormSingUp(formData, setError);
    if (isValid) {
      console.log("Form Data:", formData);
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
            <StyledH1TitleLoginForm>S'inscrire</StyledH1TitleLoginForm>
            <LabelCustom margin="2em 0 .1em 0">Lastname <RequiredField/></LabelCustom>
            <TextFieldCustom
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              id="outlined-basic"
              variant="outlined"
              placeholder="Lastname"
            />
            <LabelCustom margin="2em 0 .1em 0">Firstname <RequiredField/></LabelCustom>
            <TextFieldCustom
              value={formData.firstname}
              onChange={handleChange}
              name="firstname"
              id="outlined-basic"
              variant="outlined"
              placeholder="Firstname"
            />
            <LabelCustom margin="2em 0 .1em 0">E-Mail address <RequiredField/></LabelCustom>
            <TextFieldCustom
              value={formData.email}
              onChange={handleChange}
              name="email"
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
                value={formData.password}
                onChange={handleChange}
                name="password"
                id="outlined-basic"
                variant="outlined"
                placeholder="Password"
              />
            </Grid>
            <LabelCustom margin="2em 0 .1em 0">Confirm password <RequiredField/></LabelCustom>
            <TextFieldCustom
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
          >
            Sign Up
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
