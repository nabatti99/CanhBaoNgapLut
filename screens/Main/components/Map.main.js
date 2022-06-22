import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Callout, Heatmap, Marker, Polyline, Geojson } from 'react-native-maps';
import { Assets, View, Image, Text, Colors } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import MarkerDanger from './MarkerDanger';

import floodData from '../../../assets/files/csvjson';
import { setPolylines, setMarkerLocation } from '../store/mapStore';

import { useDispatch } from 'react-redux';

const windowHeight = Dimensions.get('screen').height;

function MapMain() {
  const dispatch = useDispatch();

  const refMap = useRef(null);

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

  const polylines = useSelector((state) => state.polylines);
  const markerDanger = useSelector((state) => state.markerDanger);
  const markerLocation = useSelector((state) => state.markerLocation);
  const shownNote = useSelector((state) => state.shownNote);

  const handleClickMapView = (e) => {
    const coordinate = e.nativeEvent.coordinate;
    dispatch(setMarkerLocation([...markerLocation, ...[coordinate]]));
  };

  const handleDragEndMarker = (e, index) => {
    const coordinate = e.nativeEvent.coordinate;
    const newMarkers = [...markerLocation];
    newMarkers[index] = coordinate;
    dispatch(setMarkerLocation([...newMarkers]));
  };

  const handleClickPolyline = (index) => {
    const newPolylines = [...polylines];

    const p = newPolylines[newPolylines.length - 1];
    newPolylines[newPolylines.length - 1] = newPolylines[index];
    newPolylines[index] = p;

    dispatch(setPolylines([...newPolylines]));
  };

  useEffect(() => {
    const a = polylines.length;
    if (a > 0) {
      refMap.current.fitToCoordinates(polylines[a - 1].points, {
        edgePadding: {
          top: 80,
          right: 80,
          bottom: 80,
          left: 80,
        },
      });
    }
  }, [polylines]);

  return (
    <View absF marginB-180 bg-blue300>
      <MapView
        ref={refMap}
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
        onPress={(e) => handleClickMapView(e)}
      >
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

        {polylines.map((polyline, index) => {
          if (polyline.points.length > 0)
            return (
              <Polyline
                tappable={true}
                key={index}
                coordinates={polyline.points}
                strokeColor={
                  index === polylines.length - 1 && polyline.strokeColor != Colors.red600
                    ? Colors.blue300
                    : polyline.strokeColor
                }
                strokeWidth={polyline.strokeWidth}
                onPress={() => handleClickPolyline(index)}
              />
            );
        })}

        {markerDanger.points?.map((point, index) => (
          <Marker
            coordinate={point}
            key={index}
            anchor={{
              x: 0.5,
              y: 0.5,
            }}
          >
            <MarkerDanger image={markerDanger.image} icon={markerDanger.icon} />
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
        {markerLocation.map((point, index) => (
          <Marker draggable={true} coordinate={point} key={index} onDragEnd={(e) => handleDragEndMarker(e, index)} />
        ))}
      </MapView>
    </View>
  );
}

export default MapMain;
