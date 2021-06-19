import { ILoginService, AuthToken } from "./login.interface";

class LoginService implements ILoginService {
  private response: object | null = null;

  private initiateLoginSession = async () => {};

  private sendLoginCredentails = async () => {};

  private completeLoginSession = async () => {};

  public login = (email: string, password: string): AuthToken => {
    return { token: "" };
  };
}

export default new LoginService();
