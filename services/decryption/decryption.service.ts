import _ from "lodash";

import rsaService from "../rsa/rsa.service";

class DecryptionService {
  public decryptWithServerPublicKey = async (
    encryptedData: any
  ): Promise<string> => {
    return rsaService.decryptWithPublicKey(this.serverPublicKey, encryptedData);
  };

  public decryptWithPublicKey = async (encryptedData: any): Promise<string> => {
    return rsaService.decryptWithPrivateKey(
      this.clientPublicKey,
      encryptedData
    );
  };
}

export default new DecryptionService();
