import fileService from "../file/file.service";
import * as RNFS from "react-native-fs";
import _ from "lodash";

abstract class KeyService {
  public serverPublicKey: string = "";
  public clientPrivateKey: string = "";
  public clientPublicKey: string = "";

  private areKeysNeeded = () => {
    return (
      _.isEmpty(this.clientPrivateKey) ||
      _.isEmpty(this.serverPublicKey) ||
      _.isEmpty(this.clientPublicKey)
    );
  };

  public readFilesAndAssignToKeys = async () => {
    if (this.areKeysNeeded()) {
      const files = await fileService.readFiles();
      const filePaths = new Map<string, string>();
      console.log(files);

      files.forEach((file: RNFS.ReadDirItem) => {
        filePaths.set(file.name, file.path);
      });

      const [privateKey, publicKey, serverPublicKey] = await Promise.all([
        RNFS.readFile(filePaths.get("private_key.pem")!, "utf8"),
        RNFS.readFile(filePaths.get("public_key.pem")!, "utf8"),
        RNFS.readFile(filePaths.get("public_key_server.pem")!, "utf8"),
      ]);

      this.serverPublicKey = serverPublicKey;
      this.clientPrivateKey = privateKey;
      this.clientPublicKey = publicKey;
    }

    return;
  };
}

export default KeyService;
