export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const GET_ERRORS = "GET_ERRORS";

export type AuthModel = {
  token: string | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type AuthState = {
  auth: AuthModel;
};

interface userLoaded {
  type: typeof USER_LOADED;
  token: string;
}

interface userLoading {
  type: typeof USER_LOADING;
}

interface loginFail {
  type: typeof LOGIN_FAIL;
}

interface registerFail {
  type: typeof REGISTER_FAIL;
}

interface authError {
  type: typeof AUTH_ERROR;
}

interface logoutSuccess {
  type: typeof LOGOUT_SUCCESS;
}

interface getErrorsAction extends errorAction {
  type: typeof GET_ERRORS;
}

interface clearErrorsAction extends errorAction {
  type: typeof CLEAR_ERRORS;
}

interface errorAction {
  message: string | undefined;
  status: number | undefined;
}

export type AuthAction =
  | userLoaded
  | loginFail
  | registerFail
  | authError
  | logoutSuccess
  | userLoading
  | getErrorsAction
  | clearErrorsAction;

export type AuthDispatch = () => void;
