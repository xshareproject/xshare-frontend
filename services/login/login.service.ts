import LoginApiService from "../../api/login/login.api.service";
import { Credentials } from "../register/register.interface";
import { ILoginService, AuthToken } from "./login.interface";

class LoginService extends LoginApiService implements ILoginService {
  private sessionToken: string | undefined = undefined;

  private initiateLoginSession = async (): Promise<void> => {
    const response = await this.loginSession();

    this.setSessionToken(response.data.sessionToken);
  };

  private setSessionToken = (sessionToken: string) => {
    this.sessionToken = sessionToken;
  };

  private sendLoginCredentails = async (
    credentials: Credentials
  ): Promise<string> => {
    const response = await this.loginCredentials(
      credentials,
      this.sessionToken!
    );

    return response.data.authToken;
  };

  private completeLoginSession = async () => {
    return this.loginComplete(this.sessionToken!);
  };

  public login = async (
    email: string,
    password: string
  ): Promise<AuthToken> => {
    await this.initiateLoginSession();
    const authToken = await this.sendLoginCredentails({ email, password });
    await this.completeLoginSession();

    return { token: authToken };
  };
}

export default new LoginService();
