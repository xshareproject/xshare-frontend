import RSA from "node-rsa";

class RsaService {
  private readonly encryptFormat = "base64";
  private readonly decryptFormat = "utf8";

  private readonly privateFormat = "private";
  private readonly publicFormat = "public";

  public generateNoneRSA = (): RSA => {
    const rsa = new RSA();

    return rsa.generateKeyPair();
  };

  private getRsaWithImportedPrivateKey = (privateKey: string) => {
    const rsa = new RSA();
    return rsa.importKey(privateKey, this.privateFormat);
  };

  private getRsaWithImportedPublicKey = (publicKey: string) => {
    const rsa = new RSA();
    return rsa.importKey(publicKey, this.publicFormat);
  };

  public encryptWithPrivateKey = (privateKey: string, data: any) => {
    const rsa = this.getRsaWithImportedPrivateKey(privateKey);

    return rsa.encryptPrivate(data, this.encryptFormat);
  };

  public encryptWithPublicKey = (publicKey: string, data: any) => {
    const rsa = this.getRsaWithImportedPublicKey(publicKey);

    return rsa.encrypt(data, this.encryptFormat);
  };

  public decryptWithPrivateKey = (
    privateKey: string,
    encryptedData: string
  ) => {
    const rsa = this.getRsaWithImportedPrivateKey(privateKey);

    return rsa.decrypt(encryptedData, this.decryptFormat);
  };

  public decryptWithPublicKey = (publicKey: string, encryptedData: string) => {
    const rsa = this.getRsaWithImportedPublicKey(publicKey);

    return rsa.decryptPublic(encryptedData, this.decryptFormat);
  };
}

export default new RsaService();
