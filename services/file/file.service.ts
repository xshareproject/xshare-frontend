import * as RNFS from "react-native-fs";

class FileService {
  public readFiles = async () => {
    return await RNFS.readDir(RNFS.DocumentDirectoryPath);
  };
}

export default new FileService();
