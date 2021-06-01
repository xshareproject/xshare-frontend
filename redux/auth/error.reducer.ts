import {
  GET_ERRORS,
  CLEAR_ERRORS,
  AuthError,
  AuthErrorAction,
} from "../types/types.auth";

const AUTH_ERROR_INITIAL_STATE: AuthError = {
  errorMessage: undefined,
  status: undefined,
};

export const authErrorReducer = (
  state = AUTH_ERROR_INITIAL_STATE,
  action: AuthErrorAction
): AuthError => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        errorMessage: action.message,
        status: action.status,
      };
    case CLEAR_ERRORS:
      return {
        errorMessage: undefined,
        status: undefined,
      };
    default:
      return state;
  }
};
