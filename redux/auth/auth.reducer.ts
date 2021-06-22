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
  isAuthenticated: false,
  isLoading: false,
};

export const authReducer = (
  state = AUTH_INITIAL_STATE,
  action: AuthAction
): AuthModel => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case USER_LOADING: {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
      };
    }
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
