import _ from "lodash";

import KeyService from "../keys/key.service";
import rsaService from "../rsa/rsa.service";

class EncryptionServivce extends KeyService {
  public encryptWithServerPublicKey = async (data: any): Promise<string> => {
    await this.readFilesAndAssignToKeys();

    return rsaService.encryptWithPublicKey(this.serverPublicKey, data);
  };

  public encryptWithPublicKey = async (data: any): Promise<string> => {
    await this.readFilesAndAssignToKeys();

    return rsaService.encryptWithPublicKey(this.clientPublicKey, data);
  };
}

export default new EncryptionServivce();
