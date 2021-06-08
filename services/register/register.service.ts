import { AxiosResponse } from "axios";
import _ from "lodash";

import RegisterApiService from "../../api/register/register.api.service";
import decryptionService from "../decryption/decryption.service";
import encryptionService from "../encryption/encryption.service";
import rsaService from "../rsa/rsa.service";
import {
  PublicAndPrivateKeyPair,
  Credentials,
  WithNoncePublic,
} from "./register.interface";

class RegisterService extends RegisterApiService {
  public registerUser = async (credentials: Credentials) => {
    const nonceKeys = await rsaService.generateNonceRSA();
    const noncePrivateKey = nonceKeys.private;

    const encryptedBody = await this.encrypteRequestBody(
      { ...credentials, noncePublicKey: nonceKeys.public },
      noncePrivateKey
    );

    const response = await this.register(encryptedBody);

    this.validateResponse(response);

    const decryptedResponseBody = await this.decrypteResponseBody(
      response.data,
      noncePrivateKey
    );

    this.convertResponseAndStoreKeys(decryptedResponseBody);
  };

  private encrypteRequestBody = async (
    credentials: Credentials & WithNoncePublic,
    privateKey: string
  ): Promise<string> => {
    return await encryptionService.encryptWithServerPublicKey(
      await rsaService.encryptWithPrivateKey(
        privateKey,
        JSON.stringify(credentials)
      )
    );
  };

  private validateResponse = (response: AxiosResponse) => {
    const { status, data } = response;

    if (status !== 200 || _.isUndefined(data)) {
      throw Error("Incorrect response.");
    }
  };

  private decrypteResponseBody = async (
    responseData: any,
    privateKey: string
  ): Promise<string> => {
    return await decryptionService.decryptWithServerPublicKey(
      await rsaService.decryptWithPrivateKey(privateKey, responseData)
    );
  };

  private convertResponseAndStoreKeys = (decryptedResponseBody: string) => {
    const keys = JSON.parse(decryptedResponseBody);
    this.storeUserKeys(keys);
  };

  private storeUserKeys = async (keys: PublicAndPrivateKeyPair) => {
    // need to store it here somehow
  };
}

export default new RegisterService();
