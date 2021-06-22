import { Credentials } from "../../services/register/register.interface";
import StorageService from "../../services/storage/storage.service";
import ApiService from "../api.serivce";

abstract class LoginApiService {
  private readonly paths = {
    session: "/auth/session",
    credentials: "/auth/login",
    complete: "/auth/complete",
  };

  public loginSession = async () => {
    const path = this.paths.session;
    const publicKey = await StorageService.getPublicKey();

    return ApiService.post(path, { publicKey });
  };

  public loginCredentials = async (
    credentials: Credentials,
    sessionToken: string
  ) => {
    const path = this.paths.credentials;

    return ApiService.post(path, {
      credentials,
      sessionToken,
    });
  };

  public loginComplete = async (sessionToken: string) => {
    const path = this.paths.complete;

    return ApiService.post(path, { sessionToken });
  };
}

export default LoginApiService;
