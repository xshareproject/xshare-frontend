export interface ILoginService {
  getResponse: () => object | null;
  login: (email: string, password: string) => AuthToken;
}

export type AuthToken = {
  token: string;
};
