import Axios, { AxiosResponse } from "axios";
import { BodyTypes, ParamsTypes } from "./api.types";

abstract class ApiService {
  private readonly BASE_URL: string = "http://localhost:3000";

  public post = async (
    path: string,
    body?: BodyTypes,
    params?: ParamsTypes
  ) => {
    return await Axios.post(path, body, { params: params });
  };

  public get = async (path: string, params?: ParamsTypes) => {
    return await Axios.get(path, { params: params });
  };

  public put = async (path: string, body?: BodyTypes, params?: ParamsTypes) => {
    return await Axios.put(path, body, { params: params });
  };
}

export default ApiService;
