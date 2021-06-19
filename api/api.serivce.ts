import Axios, { AxiosResponse } from "axios";
import { BodyTypes, ParamsTypes } from "./api.types";

class ApiService {
  private readonly BASE_URL: string = "https://e53a0134c50a.ngrok.io";

  public post = (
    path: string,
    body?: BodyTypes,
    params?: ParamsTypes
  ): Promise<AxiosResponse<any>> => {
    const url = this.BASE_URL + path;
    return Axios.post(url, body, { params: params, headers: {} });
  };

  public get = (
    path: string,
    params?: ParamsTypes
  ): Promise<AxiosResponse<any>> => {
    const url = this.BASE_URL + path;
    return Axios.get(url, { params: params });
  };

  public put = (
    path: string,
    body?: BodyTypes,
    params?: ParamsTypes
  ): Promise<AxiosResponse<any>> => {
    const url = this.BASE_URL + path;
    return Axios.put(url, body, { params: params });
  };
}

export default new ApiService();
