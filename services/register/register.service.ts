import { AxiosResponse } from "axios";
import _ from "lodash";

import RegisterApiService from "../../api/register/register.api.service";
import decryptionService from "../decryption/decryption.service";
import encryptionService from "../encryption/encryption.service";
import rsaService from "../rsa/rsa.service";
import storageService from "../storage/storage.service";
import {
  PublicAndPrivateKeyPair,
  Credentials,
  WithNoncePublic,
  RegisterCredentials,
} from "./register.interface";

class RegisterService extends RegisterApiService {
  public registerUser = async (credentials: RegisterCredentials) => {
    const response = await this.register(credentials);

    this.validateResponse(response);

    await this.storeUserKeys(response.data);

    return;
  };

  private encrypteRequestBody = async (
    credentials: Credentials & WithNoncePublic,
    privateKey: string
  ): Promise<string> => {
    return await encryptionService.encryptWithServerPublicKey(
      await rsaService.encrypt(privateKey, JSON.stringify(credentials))
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

  private convertResponseAndStoreKeys = (response: any) => {};

  private storeUserKeys = (keys: PublicAndPrivateKeyPair) => {
    // need to store it here somehow
    return Promise.all([
      storageService.setPrivateKey(keys.privateKey),
      storageService.setPublicKey(keys.publicKey),
    ]);
  };
}

export default new RegisterService();
