import { RegisterCredentials } from "../../services/register/register.interface";
import ApiService from "../api.serivce";

abstract class RegisterApiService {
  private readonly paths = {
    register: "/user/register",
  };
  private readonly apiService = new ApiService();

  public register = (credentials: RegisterCredentials) => {
    const path = this.paths.register;
    return this.apiService.post(path, credentials);
  };
}

export default RegisterApiService;
