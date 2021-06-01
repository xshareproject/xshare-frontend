interface IEncryptionService {
  privateKey: string;

  encryptWithPrivateKey: () => string;
}

export default IEncryptionService;
