import React from "react";
import { Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View } from "react-native-ui-lib";
import { useSelector } from "react-redux";

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

  const polyline = useSelector((state) => state.polyline);
  const marker = useSelector((state) => state.marker);

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
      >
        <Polyline
          coordinates={polyline.points}
          strokeColor={polyline.strokeColor}
          strokeWidth={polyline.strokeWidth}
        />

        {marker.points.map((point, index) => (
          <Marker coordinate={point} image={marker.image} key={index} />
        ))}
      </MapView>
    </View>
  );
}

export default MapMain;
