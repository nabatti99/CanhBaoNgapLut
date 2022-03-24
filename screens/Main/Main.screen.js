import React from "react";
import { View } from "react-native-ui-lib";
import { Provider } from "react-redux";

import mapStore from "./store/mapStore";
import MapMain from "./components/Map.main";
import BottomArea from "./BottomArea/BottomArea.main";

function MainScreen() {
  return (
    <Provider store={mapStore}>
      <View flex bottom>
        <MapMain />
        <BottomArea />
      </View>
    </Provider>
  );
}

export default MainScreen;
