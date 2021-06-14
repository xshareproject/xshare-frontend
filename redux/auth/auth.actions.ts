import { Dispatch } from "redux";

import {
  Credentials,
  RegisterCredentials,
} from "../../services/register/register.interface";
import {
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  AuthAction,
  USER_LOADING,
} from "../types/types.auth";
import registerService from "../../services/register/register.service";

const userLoading = (): AuthAction => ({ type: USER_LOADING });

const userLoaded = (authToken: string): AuthAction => ({
  type: USER_LOADED,
  token: authToken,
});

const registerSuccess = (payload: any): AuthAction => ({
  type: REGISTER_SUCCESS,
  payload: payload,
});

const loadingSuccess = (payload: any): AuthAction => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});

export const login = (credentials: Credentials) => {
  return (dispatch: Dispatch) => {
    dispatch(userLoading());
  };
};

export const register = (credentials: RegisterCredentials) => {
  return (dispatch: Dispatch) => {
    dispatch(userLoading());
    registerService
      .registerUser(credentials)
      .then(() => {
        console.log("register success");
        // login here
      })
      .catch((error) => {
        console.log("register error");
        console.log(error);
      });
  };
};

export const logout = (): AuthAction => {
  console.log("logout");

  return { type: LOGOUT_SUCCESS };
};
