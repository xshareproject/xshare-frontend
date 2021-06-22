export interface ILoginService {
  login: (email: string, password: string) => Promise<AuthToken>;
}

export type AuthToken = {
  token: string;
};
