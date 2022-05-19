import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Callout, Heatmap, Marker, Polyline, Geojson } from 'react-native-maps';
import { Assets, View, Image, Text, Colors } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import MarkerDanger from './MarkerDanger';

import floodData from '../../../assets/files/csvjson';

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
        {myMapKmz ? <Geojson geojson={myMapKmz} /> : null}

        <Heatmap
          points={floodData}
          gradient={{
            colors: [
              '#98f4ff00',
              '#7aefed',
              '#65e9d4',
              '#5ee1b5',
              '#66d893',
              '#76cd6d',
              '#89c145',
              '#9db311',
              '#b2a200',
              '#c78e00',
              '#dc7400',
              '#ef5200',
              '#ff0000',
            ],
            startPoints: [
              0, 0.08333333333333333, 0.16666666666666666, 0.25, 0.3333333333333333, 0.4166666666666667, 0.5,
              0.5833333333333334, 0.6666666666666666, 0.75, 0.8333333333333334, 0.9166666666666666, 1,
            ],
          }}
          maxIntensity={100}
          gradientSmoothing={10}
          opacity={1}
        />

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
            <Callout tooltip>
              <View width={300} backgroundColor={Colors.white} br4 md padding-8>
                <Text>{point.name}</Text>
                <Text>{point.abc}</Text>
                <Text>{point.latitude}</Text>
                <Text>{point.longitude}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

export default MapMain;
