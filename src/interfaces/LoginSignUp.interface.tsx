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
}

export interface FormLoginData {
  email?: string;
  password?: string;
}

export interface User {
  id: string;
  token?: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  role: string;
}
