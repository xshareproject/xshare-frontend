export interface ILoginService {
  login: (email: string, password: string) => AuthToken;
}

export type AuthToken = {
  token: string;
};
