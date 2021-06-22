import { GET_ERRORS, CLEAR_ERRORS, AuthErrorAction } from "../types/types.auth";

export const getErrors = (message: object, status: number): AuthErrorAction => {
  return {
    type: GET_ERRORS,
    message,
    status,
  };
};

export const clearErrors = (): AuthErrorAction => {
  return {
    type: CLEAR_ERRORS,
    message: undefined,
    status: undefined,
  };
};
