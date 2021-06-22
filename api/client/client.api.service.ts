import ApiService from "../api.serivce";

class ClientApiService {
  private readonly paths = {
    setup: "/client/setup",
  };

  public getSSLKeyAndServicePublicKey = () => {
    const path = this.paths.setup;
    return ApiService.get(path);
  };
}

export default new ClientApiService();
