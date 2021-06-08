import {
  AUTH_ERROR,
  USER_LOADED,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  AuthState,
  AuthAction,
  AuthModel,
} from "../types/types.auth";

const AUTH_INITIAL_STATE: AuthModel = {
  token: undefined,
  isAuthenticated: undefined,
};

export const authReducer = (
  state = AUTH_INITIAL_STATE,
  action: AuthAction
): AuthModel => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        token: undefined,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
