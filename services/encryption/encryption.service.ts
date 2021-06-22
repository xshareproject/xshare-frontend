import _ from "lodash";

import rsaService from "../rsa/rsa.service";

class EncryptionServivce {
  public encryptWithServerPublicKey = async (data: any): Promise<string> => {
    return rsaService.encryptWithPublicKey(this.serverPublicKey, data);
  };

  public encryptWithPublicKey = async (data: any): Promise<string> => {
    return rsaService.encryptWithPublicKey(this.clientPublicKey, data);
  };
}

export default new EncryptionServivce();
