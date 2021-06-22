import { Dispatch } from "redux";

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
  GET_ERRORS,
} from "../types/types.auth";
import {
  Credentials,
  RegisterCredentials,
} from "../../services/register/register.interface";
import RegisterService from "../../services/register/register.service";
import LoginService from "../../services/login/login.service";

class AuthActionService {
  private userLoading = (): AuthAction => ({ type: USER_LOADING });

  private userLoaded = (authToken: string): AuthAction => ({
    type: USER_LOADED,
    token: authToken,
  });

  private authError = (message?: string, status?: number): AuthAction => ({
    type: GET_ERRORS,
    message,
    status,
  });

  public login = (credentials: Credentials) => {
    return async (dispatch: Dispatch) => {
      dispatch(this.userLoading());
      try {
        const authToken = await LoginService.login(
          credentials.email,
          credentials.password
        );
        dispatch(this.userLoaded(authToken.token));
      } catch (error) {
        dispatch(this.authError(error.message, error.status));
      }
    };
  };

  public register = (credentials: RegisterCredentials) => {
    return async (dispatch: Dispatch) => {
      dispatch(this.userLoading());
      try {
        await RegisterService.registerUser(credentials);
        const authToken = await LoginService.login(
          credentials.email,
          credentials.password
        );
        dispatch(this.userLoaded(authToken.token));
      } catch (error) {
        dispatch(this.authError(error.message, error.status));
      }
    };
  };

  public logout = (): AuthAction => {
    return { type: LOGOUT_SUCCESS };
  };
}

export default new AuthActionService();
