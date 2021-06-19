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

  private sslKey: string = "";
  private privateKey: string = "";
  private publicKey: string = "";
  private serverPublicKey: string = "";

  public getSSLKey = (): Promise<SSLKey> =>
    this.storage.load({ key: this.SSLKEY });

  public getServerPublicKey = (): Promise<ServerPublicKey> =>
    this.storage.load({ key: this.SERVERPUBLICKEY });

  public getPublicKey = (): Promise<PublicKey> =>
    this.storage.load({ key: this.PUBLICKEY });

  public getPrivateKey = (): Promise<PrivateKey> =>
    this.storage.load({ key: this.PRIVATEKEY });

  public loadSSLKey = async (): Promise<void> => {
    const res = await this.getSSLKey();
    this.sslKey = res.SSL_KEY;
  };

  public loadServerPublicKey = async (): Promise<void> => {
    const res = await this.getServerPublicKey();
    this.sslKey = res.SERVER_PUBLIC_KEY;
  };

  public loadPublicKey = async () => {
    const res = await this.getPublicKey();
    this.sslKey = res.PUBLIC_KEY;
  };

  public loadPrivateKey = async () => {
    const res = await this.getPrivateKey();
    this.sslKey = res.PRIVATE_KEY;
  };

  public storeSSLKey = (sslKey: string) =>
    this.storage.save({
      key: this.SSLKEY,
      data: sslKey,
      expires: null,
    });

  public storeServerPublicKey = (serverPublicKey: string) =>
    this.storage.save({
      key: this.SERVERPUBLICKEY,
      data: serverPublicKey,
      expires: null,
    });

  public storePublicKey = (publicKey: string) =>
    this.storage.save({
      key: this.PUBLICKEY,
      data: publicKey,
      expires: null,
    });

  public storePrivateKey = (privateKey: string) =>
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
