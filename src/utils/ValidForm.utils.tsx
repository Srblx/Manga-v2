import { Dispatch, SetStateAction } from "react";
import {
  FormLoginData,
  FormSignUpData,
} from "../interfaces/LoginSignUp.interface";
import { AddNewsForm } from "../interfaces/NewsModel.interface";

export const validateFormSingUp = (
  formData: FormSignUpData,
  setError: Dispatch<SetStateAction<string>>
) => {
  if (
    !formData.lastname ||
    !formData.firstname ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    setError("Please fill in all fields.");
    return false;
  }
  if (formData.lastname.length < 3) {
    setError("Too short lastname between 3 and 30 characters");
    return false;
  }
  if (formData.firstname.length < 3) {
    setError("Too short firstname between 3 and 30 characters");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|fr)$/;
  if (!emailRegex.test(formData.email)) {
    setError("Invalid email address");
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match!");
    return false;
  }
  const isPasswordValid = validatePassword(formData.password);
  if (!isPasswordValid) {
    setError(
      "Password must contain at least one uppercase letter, one special character, and be at least 12 characters long."
    );
    return false;
  }
  setError("");
  return true;
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z]).{12,}$/;
  return passwordRegex.test(password);
};

export const validateFormLogin = (
  formData: FormLoginData,
  setError: Dispatch<SetStateAction<string>>
) => {
  if (!formData.password || !formData.email) {
    setError("Please fill in all fields.");
    return false;
  }
  return true;
};

export const validateFormAddNews = (
  formData: AddNewsForm,
  setError: Dispatch<SetStateAction<string>>
) => {
  if (!formData.content || !formData.title || !formData.imageUrl) {
    setError("Please fill in all fields");
    return false;
  } else if (formData.title.length < 3 || formData.content.length < 3) {
    setError("The title and content must be at least 3 characters long");
    return false;
  } else if (formData.title.length > 150 || formData.content.length > 800) {
    setError(
      "The title must not exceed 150 characters and the description must not exceed 800 characters."
    );
    return false;
  } /* else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.imageUrl)) {
    setError("The image URL must be a valid HTTP or HTTPS URL with a supported image extension (JPG, JPEG, PNG, GIF, or WEBP).");
    return false;
  } */
  return true;
};
