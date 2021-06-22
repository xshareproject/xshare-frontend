interface IDecryptionService {
  privateKey: string;
  servicePublicKey: string;

  decryptWithServerPublicKey: () => object;
  decryptWithPrivateKey: () => object;
}

export default IDecryptionService;
