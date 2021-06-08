import ApiService from "../api.serivce";

class ClientApiService extends ApiService {
  private readonly paths = {
    setup: "/client/setup",
  };

  public getSSLKeyAndServicePublicKey = () => {
    const path = this.paths.setup;
    return this.get(path);
  };
}

export default new ClientApiService();
