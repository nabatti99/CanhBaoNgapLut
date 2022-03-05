import React from "react";
import MapView from "react-native-maps";
import { Text, View } from "react-native-ui-lib";

function MapScreen() {
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
    <View flex>
      <View absF marginB-152 bg-blue300>
        <MapView
          style={{
            flex: 1,
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
    </View>
  );
}

export default MapScreen;
