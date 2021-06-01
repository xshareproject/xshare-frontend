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

export const login = (email: string, password: string): AuthAction => {
  console.log("LOGIN");

  return { type: USER_LOADING };
};

export const enable = (): AuthAction => ({ type: USER_LOADED });
