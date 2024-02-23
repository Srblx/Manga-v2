export interface FormSignUpData {
  lastname?: string;
  firstname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface CreateUserDto {
  lastname?: string;
  firstname?: string;
  email?: string;
  password?: string;
  role: "USER";
}

export interface FormLoginData {
  email?: string;
  password?: string;
}