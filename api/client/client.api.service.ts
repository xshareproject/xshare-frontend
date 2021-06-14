import ApiService from "../api.serivce";

class ClientApiService {
  private readonly paths = {
    setup: "/client/setup",
  };
  private readonly apiService = new ApiService();

  public getSSLKeyAndServicePublicKey = () => {
    const path = this.paths.setup;
    return this.apiService.get(path);
  };
}

export default new ClientApiService();
