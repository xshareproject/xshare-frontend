import { Dispatch } from "redux";

import { Credentials } from "../../services/register/register.interface";
import {
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  AuthAction,
} from "../types/types.auth";
import registerService from "../../services/register/register.service";

export const login = (email: string, password: string) => {
  console.log("login");

  return { type: USER_LOADED };
};

export const register = async (
  credentials: Credentials
): Promise<AuthAction> => {
  console.log("register");

  await registerService.registerUser(credentials);

  // login flow here

  return { type: USER_LOADED };
};

export const logout = (): AuthAction => {
  console.log("logout");

  return { type: LOGOUT_SUCCESS };
};
