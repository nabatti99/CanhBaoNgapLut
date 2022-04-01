import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Assets, View, Image } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import MarkerDanger from './MarkerDanger';

const windowHeight = Dimensions.get('screen').height;

function MapMain() {
  const customMapStyle = [
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dbeaff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#b7cdf0',
        },
      ],
    },
  ];

  const polyline = useSelector((state) => state.polyline);
  const marker = useSelector((state) => state.marker);
  const shownNote = useSelector((state) => state.shownNote);

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
        <Polyline coordinates={polyline.points} strokeColor={polyline.strokeColor} strokeWidth={polyline.strokeWidth} />

        {marker.points.map((point, index) => (
          <Marker
            coordinate={point}
            key={index}
            anchor={{
              x: 0.5,
              y: 0.5,
            }}
          >
            <MarkerDanger image={marker.image} icon={marker.icon} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

export default MapMain;
