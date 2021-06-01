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
  isLoading: false,
};

export const authReducer = (
  state = AUTH_INITIAL_STATE,
  action: AuthAction
): AuthModel => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      return {
        ...state,
        token: undefined,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
