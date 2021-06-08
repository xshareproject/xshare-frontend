import ApiService from "../api.serivce";

abstract class RegisterApiService extends ApiService {
  private readonly paths = {
    register: "/user/register",
  };

  public register = (encryptedBody: string) => {
    const path = this.paths.register;
    return this.post(path, encryptedBody);
  };
}

export default RegisterApiService;
