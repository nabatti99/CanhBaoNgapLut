import React from "react";
import { View } from "react-native-ui-lib";
import MapMain from "./components/Map.main";
import SearchLocation from "./bottomParts/SeachLocation.main";

function MainScreen() {
  return (
    <View flex bottom>
      <MapMain />
      <SearchLocation />
    </View>
  );
}

export default MainScreen;
