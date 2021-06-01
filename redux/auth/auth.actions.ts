import axios from "axios";
import { Dispatch } from "react";
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
  Auth,
} from "../types/types.auth";

export const login =
  () => (dispatch: Dispatch<AuthAction>, getState: () => Auth) => {
    const state = getState();
    dispatch({ type: USER_LOADING });
    // handle api calls here
  };
