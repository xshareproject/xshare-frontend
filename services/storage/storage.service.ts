import _ from "lodash";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";

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

  public getSSLKey = (): Promise<string> =>
    this.storage.load({ key: this.SSLKEY });

  public getServerPublicKey = (): Promise<string> =>
    this.storage.load({ key: this.SERVERPUBLICKEY });

  public getPublicKey = (): Promise<string> =>
    this.storage.load({ key: this.PUBLICKEY });

  public getPrivateKey = (): Promise<string> =>
    this.storage.load({ key: this.PRIVATEKEY });

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
