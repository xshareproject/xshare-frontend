export interface PublicAndPrivateKeyPair {
  publicKey: string;
  privateKey: string;
}

export interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface WithNoncePublic {
  noncePublicKey: string;
}
