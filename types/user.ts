export interface UserResponseApi {
  //Tipagem response api
}

export interface User {
  //Tipagem respose usuario
}

export interface LoginFormType {
  user: string;
  password: string;
}

export interface ChangePasswordFormType {
  email: string | undefined;
  new_password: string;
}

export interface ResetPasswordFormType {
  email: string;
}

export interface InsertCodeFormType {
  id: string | undefined;
  code: string;
}
