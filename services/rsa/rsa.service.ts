import { RSA, KeyPair } from "react-native-rsa-native";

class RsaService {
  public generateNonceRSA = async (): Promise<KeyPair> => {
    return await RSA.generateKeys(2048);
  };

  public encryptWithPrivateKey = async (
    privateKey: string,
    data: string
  ): Promise<string> => {
    return await RSA.encrypt(data, privateKey);
  };

  public encryptWithPublicKey = async (
    publicKey: string,
    data: string
  ): Promise<string> => {
    return await RSA.encrypt(data, publicKey);
  };

  public decryptWithPrivateKey = async (
    privateKey: string,
    encryptedData: string
  ): Promise<string> => {
    return await RSA.decrypt(encryptedData, privateKey);
  };

  public decryptWithPublicKey = async (
    publicKey: string,
    encryptedData: string
  ): Promise<string> => {
    return await RSA.decrypt(encryptedData, publicKey);
  };
}

export default new RsaService();
