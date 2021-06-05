import { Dispatch } from "redux";
import {
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  AuthAction,
} from "../types/types.auth";

export const setLoading: AuthAction = { type: USER_LOADING };

export const login = (email: string, password: string) => {
  console.log("login");
  return { type: USER_LOADING };
};

export const register = (): AuthAction => {
  console.log("register");
  return { type: USER_LOADING };
};

export const logout = (): AuthAction => {
  console.log("logout");
  return { type: USER_LOADING };
};
