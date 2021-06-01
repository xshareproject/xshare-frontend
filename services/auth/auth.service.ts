import IAuthService from "./auth.service.interface";

export default class AuthService implements IAuthService {
  private authToken: string | null = null;
  private response: object | null = null;
  private email: string | null;
  private password: string | null;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public clearFields = () => {
    this.authToken = null;
    this.response = null;
    this.email = null;
    this.password = null;
  };

  public getResponse = (): object | null => this.response;
  public initiateLoginSession = () => {};
  public sendLoginCredentails = () => {};
  public completeLoginSession = () => {};
  private storeAuthToken = () => true;
}
