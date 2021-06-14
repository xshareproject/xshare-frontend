import _ from "lodash";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";

import {
  SSLKey,
  ServerPublicKey,
  PrivateKey,
  PublicKey,
} from "./storage.interface";

class StorageService {
  private readonly storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: false,
    size: 5000,
  });

  private readonly SSLKEY = "SSLKEY";
  private readonly SERVERPUBLICKEY = "SERVERPUBLICKEY";
  private readonly PUBLICKEY = "PUBLICKEY";
  private readonly PRIVATEKEY = "PRIVATEKEY";

  public getSSLKey = (): Promise<SSLKey> =>
    this.storage.load({ key: this.SSLKEY });

  public getServerPublicKey = (): Promise<ServerPublicKey> =>
    this.storage.load({ key: this.SERVERPUBLICKEY });

  public getPublicKey = (): Promise<PublicKey> =>
    this.storage.load({ key: this.PUBLICKEY });

  public getPrivateKey = (): Promise<PrivateKey> =>
    this.storage.load({ key: this.PRIVATEKEY });

  public setSSLKey = (sslKey: string) =>
    this.storage.save({
      key: this.SSLKEY,
      data: sslKey,
      expires: null,
    });

  public setServerPublicKey = (serverPublicKey: string) =>
    this.storage.save({
      key: this.SERVERPUBLICKEY,
      data: serverPublicKey,
      expires: null,
    });

  public setPublicKey = (publicKey: string) =>
    this.storage.save({
      key: this.PUBLICKEY,
      data: publicKey,
      expires: null,
    });

  public setPrivateKey = (privateKey: string) =>
    this.storage.save({
      key: this.PRIVATEKEY,
      data: privateKey,
      expires: null,
    });

  public isSetUpRequired = async (): Promise<boolean> =>
    this.storage
      .getBatchData([{ key: this.SSLKEY }, { key: this.SERVERPUBLICKEY }])
      .then((values: any[]) => {
        return values.length === 0;
      })
      .catch(() => {
        return true;
      });
}

export default new StorageService();
