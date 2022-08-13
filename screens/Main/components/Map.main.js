import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Callout, Heatmap, Marker, Polyline, Geojson } from 'react-native-maps';
import { Assets, View, Image, Text, Colors } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import MarkerDanger from './MarkerDanger';

import floodData from '../../../assets/files/csvjson';
import { setPolylines, setMarkerLocation, setShowTopArea, setShowTopComponent } from '../store/mapStore';

import { useDispatch } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY, TYPE_SHOW_TOP_COMPOENT } from '../../../constants/constant';
import * as placeApi from '../../../apis/place.api';

const windowHeight = Dimensions.get('screen').height;

const MapMain = React.forwardRef(({ clickMap }, ref) => {
  const dispatch = useDispatch();
  // const refMap = useRef(null);

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

  const handleLongClickMapView = useCallback(
    async (e) => {
      try {
        const coordinate = e.nativeEvent.coordinate;
        const detailPlace = await placeApi.searchLocation(coordinate);
        const data = {
          name: detailPlace.display_name,
          coordinate,
        };
        dispatch(setMarkerLocation([...markerLocation, ...[data]]));
      } catch (error) {
        console.log(error);
      }
    },
    [markerLocation]
  );

  const handleDragEndMarker = useCallback(
    (e, index) => {
      const coordinate = e.nativeEvent.coordinate;
      const newMarkers = [...markerLocation];
      newMarkers[index] = {
        currentPosition: newMarkers[index].currentPosition,
        coordinate,
      };

      dispatch(setMarkerLocation([...newMarkers]));
    },
    [markerLocation]
  );

  const handleClickPolyline = useCallback(
    (index) => {
      const newPolylines = [...polylines];

      const p = newPolylines[newPolylines.length - 1];
      newPolylines[newPolylines.length - 1] = newPolylines[index];
      newPolylines[index] = p;

      dispatch(setPolylines([...newPolylines]));
    },
    [polylines]
  );

  useEffect(() => {
    const a = polylines.length;
    if (a > 0) {
      let points = [];
      polylines[a - 1].forEach((p) => {
        points = [...points, ...p.points];
      });
      if (points.length > 0) {
        setTimeout(() => {
          dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.TOP_AREA));
        }, 0);
      }
      ref.current.fitToCoordinates(points, {
        edgePadding: {
          top: 240,
          right: 40,
          bottom: 220,
          left: 40,
        },
      });
    }
  }, [polylines, markerLocation]);

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }
  }, []);

  const fecthCurrentPosition = useCallback(async () => {
    try {
      await requestPermissions();
      Geolocation.getCurrentPosition(
        (info) => {
          const current = {
            name: 'Vị trí hiện tại',
            currentPosition: true,
            coordinate: {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            },
          };
          ref.current.setCamera(
            {
              center: {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
              },
              zoom: 16,
            },
            1000
          );
          dispatch(setMarkerLocation([current]));
          AsyncStorage.setItem(STORAGE_KEY.CURRENT_POSITION, JSON.stringify(current));
        },
        (err) => console.log('error', err)
      );
    } catch (error) {
      alert('Vui lòng cho phép ứng dụng truy cập vị trí');
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    fecthCurrentPosition();
  }, []);

  return (
    <View absF marginB-180 bg-blue300>
      <MapView
        ref={ref}
        style={{
          height: windowHeight,
        }}
        showsUserLocation={true}
        showsCompass={true}
        // customMapStyle={customMapStyle}
        showsMyLocationButton={false}
        onLongPress={(e) => handleLongClickMapView(e)}
        onPress={clickMap}
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
              0, 0.08333333333333333, 0.16666666666666666, 0.25, 0.3333333333333333, 0.4166666666666667, 0.5, 0.5833333333333334,
              0.6666666666666666, 0.75, 0.8333333333333334, 0.9166666666666666, 1,
            ],
          }}
          maxIntensity={100}
          gradientSmoothing={10}
          opacity={1}
        />

        {markerLocation.length > 1 &&
          polylines.map((polyline, index) => {
            return polyline.map((p, i) => {
              if (p.points.length > 0) {
                const strokeColor =
                  index === polylines.length - 1
                    ? p.strokeColor != Colors.red600
                      ? Colors.blue300
                      : Colors.red600
                    : p.strokeColor === Colors.red600
                    ? Colors.red300
                    : p.strokeColor;
                return (
                  <Polyline
                    zIndex={100}
                    tappable={true}
                    key={i}
                    coordinates={p.points}
                    strokeColor={strokeColor}
                    strokeWidth={p.strokeWidth}
                    onPress={() => handleClickPolyline(index)}
                  />
                );
              }
            });
          })}

        {/* {markerDanger.points?.map((point, index) => (
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
        ))} */}
        {markerLocation.length > 0 &&
          markerLocation.map((marker, index) => {
            if (marker.currentPosition) return;
            else {
              return (
                <Marker
                  draggable={true}
                  coordinate={marker.coordinate}
                  key={index.toString()}
                  onDragEnd={(e) => handleDragEndMarker(e, index)}
                />
              );
            }
          })}
      </MapView>
    </View>
  );
});

export default React.memo(MapMain);
