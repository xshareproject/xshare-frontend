import Axios, { AxiosResponse } from "axios";
import { BodyTypes, ParamsTypes } from "./api.types";

abstract class ApiService {
  private readonly BASE_URL: string = "https://a94432ad77a6.ngrok.io";

  public post = (
    path: string,
    body?: BodyTypes,
    params?: ParamsTypes
  ): Promise<AxiosResponse<any>> => {
    const url = this.BASE_URL + path;
    return Axios.post(url, body, { params: params });
  };

  public get = (
    path: string,
    params?: ParamsTypes
  ): Promise<AxiosResponse<any>> => {
    const url = this.BASE_URL + path;
    console.log(url);
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

export default ApiService;
