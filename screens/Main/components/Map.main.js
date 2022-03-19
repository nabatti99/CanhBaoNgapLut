import React from "react";
import { Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Text, View } from "react-native-ui-lib";

const windowHeight = Dimensions.get("screen").height;

function MapMain() {
  const customMapStyle = [
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dbeaff",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#b7cdf0",
        },
      ],
    },
  ];

  return (
    <View absF marginB-180 bg-blue300>
      <MapView
        style={{
          height: windowHeight - 198,
        }}
        initialRegion={{
          latitude: 15.5,
          longitude: 108.1,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        showsUserLocation={true}
        showsCompass={true}
        customMapStyle={customMapStyle}
      />
    </View>
  );
}

export default MapMain;
