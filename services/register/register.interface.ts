export interface PublicAndPrivateKeyPair {
  publicKey: string;
  privateKey: string;
}

export interface RegisterCredentials extends Credentials {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface WithNoncePublic {
  noncePublicKey: string;
}

export interface Credentials {
  email: string;
  password: string;
}
