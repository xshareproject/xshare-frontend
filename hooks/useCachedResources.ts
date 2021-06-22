import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

import ClientApiService from "../api/client/client.api.service";
import StorageService from "../services/storage/storage.service";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });

        if (await StorageService.isSetUpRequired()) {
          const {
            data: { sslKey, serverPublicKey },
          } = await ClientApiService.getSSLKeyAndServicePublicKey();

          await StorageService.storeSSLKey(sslKey);
          await StorageService.storeServerPublicKey(serverPublicKey);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
