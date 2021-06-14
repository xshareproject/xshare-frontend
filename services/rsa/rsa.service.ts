import { RSA } from "react-native-rsa-native";
class RsaService {
  public generateNonceRSA = () => {
    return RSA.generateKeys(2048);
  };

  public encrypt = (key: string, data: string) => {
    return RSA.encrypt64(data, key);
  };

  public decryptWithPrivateKey = (key: string, encryptedData: string) => {
    return RSA.decrypt64(encryptedData, key);
  };
}

export default new RsaService();
