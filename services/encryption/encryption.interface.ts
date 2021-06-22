interface IEncryptionService {
  encryptWithPrivateKey: () => string;
  encryptWithServerPublicKey: () => string;
}

export default IEncryptionService;
