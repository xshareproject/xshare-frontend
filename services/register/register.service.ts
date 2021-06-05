import { AxiosResponse } from "axios";
import _ from "lodash";

import ApiService from "../../api/api.serivce";
import { PublicAndPrivateKeyPair } from "./register.interface";

class RegisterService extends ApiService {
  private readonly registerPaths = {
    register: "user/register",
  };

  public registerUser = async (
    encryptedBody: string
  ): Promise<PublicAndPrivateKeyPair> => {
    const path = this.registerPaths.register;

    const response = await this.post(path, encryptedBody);

    this.validateResponse(response);

    return this.convertResponse(response);
  };

  private validateResponse = (response: AxiosResponse) => {
    const { status, data } = response;

    if (status !== 200 || _.isUndefined(data)) {
      throw Error("Incorrect response.");
    }
  };

  private convertResponse = (
    response: AxiosResponse
  ): PublicAndPrivateKeyPair => {
    return { publicKey: "", privateKey: "" };
  };
}

export default new RegisterService();
