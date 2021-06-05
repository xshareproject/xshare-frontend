import NodeRSA from "node-rsa";

export interface IRsaService {
  generateNoneRSA: () => NodeRSA;
}
