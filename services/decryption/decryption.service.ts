import _ from "lodash";
import KeyService from "../keys/key.service";

import rsaService from "../rsa/rsa.service";

class DecryptionService extends KeyService {
  public decryptWithServerPublicKey = async (
    encryptedData: any
  ): Promise<string> => {
    await this.readFilesAndAssignToKeys();

    return rsaService.decryptWithPublicKey(this.serverPublicKey, encryptedData);
  };

  public decryptWithPublicKey = async (encryptedData: any): Promise<string> => {
    await this.readFilesAndAssignToKeys();

    return rsaService.decryptWithPrivateKey(
      this.clientPublicKey,
      encryptedData
    );
  };
}

export default new DecryptionService();
