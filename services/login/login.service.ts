import { ILoginService, AuthToken } from "./login.interface";

export default class LoginService implements ILoginService {
  private response: object | null = null;

  private clearResponse = () => {
    this.response = null;
  };

  public getResponse = (): object | null => this.response;

  private initiateLoginSession = async () => {};

  private sendLoginCredentails = async () => {};

  private completeLoginSession = async () => {};

  public login = (email: string, password: string): AuthToken => {
    return { token: "" };
  };
}
