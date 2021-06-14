import ApiService from "../api.serivce";

abstract class LoginApiService {
  private readonly apiService = new ApiService();
}

export default LoginApiService;
