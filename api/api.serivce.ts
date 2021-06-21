import Axios, { AxiosResponse } from "axios";
import { BodyTypes, ParamsTypes, Headers } from "./api.types";
import StorageService from "../services/storage/storage.service";

class ApiService {
  private readonly BASE_URL: string = "https://bc145bf19eb5.ngrok.io";

  private readonly sslKeyPath = "x-ssl-key";
  private readonly authTokenPath = "authorization";

  public post = async (
    path: string,
    body?: BodyTypes,
    params?: ParamsTypes
  ): Promise<AxiosResponse<any>> => {
    const url = this.BASE_URL + path;
    const headers = await this.getHeaders(path);

    return Axios.post(url, body, {
      params: params,
      headers,
    });
  };

  public get = async (
    path: string,
    params?: ParamsTypes
  ): Promise<AxiosResponse<any>> => {
    const url = this.BASE_URL + path;
    const headers = await this.getHeaders(path);

    return Axios.get(url, { params: params, headers });
  };

  public put = async (
    path: string,
    body?: BodyTypes,
    params?: ParamsTypes
  ): Promise<AxiosResponse<any>> => {
    const url = this.BASE_URL + path;
    const headers = await this.getHeaders(path);

    return Axios.put(url, body, { params: params, headers });
  };

  private getHeaders = async (path: string): Promise<Headers> => {
    let headers: Headers = {
      [this.authTokenPath]: null,
      [this.sslKeyPath]: null,
    };

    const sslKey = await StorageService.getSSLKey();
    console.log(sslKey);
    // load auth token here

    switch (path) {
      case "/client/setup":
        break;
      case "/user/register":
      case "/auth/session":
      case "/auth/login":
      case "/auth/complete":
        headers[this.sslKeyPath] = sslKey;
        break;
      default:
        headers[this.sslKeyPath] = sslKey;
        headers[this.authTokenPath] = "authTokenHere";
    }

    return headers;
  };
}

export default new ApiService();
