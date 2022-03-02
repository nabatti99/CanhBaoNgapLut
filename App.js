import React, { useEffect, useState } from "react";
import { NativeRouter } from "react-router-native";
import { Routes, Route } from "react-router-dom";

import MainSplashScreen from "./screens/Splash/MainSplash.screen";
import Splash1Screen from "./screens/Splash/Splash1.screen";
import Splash2Screen from "./screens/Splash/Splash2.screen";
import Splash3Screen from "./screens/Splash/Splash3.screen";
import MapScreen from "./screens/Map/Map.screen";

import loadConfig from "./config";

export default function App() {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    loadConfig().then(() => {
      console.log("Config Loaded");
      setIsConfigLoaded(true);
    });
  }, []);

  if (!isConfigLoaded) return null;
  else
    return (
      <NativeRouter>
        <Routes>
          <Route path="/" element={<MainSplashScreen />} />
          <Route path="Splash1" element={<Splash1Screen />} />
          <Route path="Splash2" element={<Splash2Screen />} />
          <Route path="Splash3" element={<Splash3Screen />} />
          <Route path="Map" element={<MapScreen />} />
        </Routes>
      </NativeRouter>
    );
}
