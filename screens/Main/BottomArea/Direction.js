import React, { useEffect, useState } from 'react';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';

import { setPolylines, setDirectionInfors, setMarkerLocation, setFloodingSituation } from '../store/mapStore';
import IconSvg from '../../../components/IconSVG';
import * as directionApi from '../../../apis/direction.api';
import * as placrApi from '../../../apis/place.api';
import polylineMap from '@mapbox/polyline';
import osrmTextInstructions from 'osrm-text-instructions';
import { ScrollView } from 'react-native';
import { useCallback } from 'react';
import { DRIVING } from '../../../constants/constant';
import flood3 from '../../../assets/files/flood3';
import flood2 from '../../../assets/files/flood2';

function Direction() {
  const [isDanger, setIsDanger] = useState(false); // false is not danger

  const dispatch = useDispatch();

  const markerLocation = useSelector((state) => state.markerLocation);
  const markerDanger = useSelector((state) => state.markerDanger);
  const polylines = useSelector((state) => state.polylines);

  const checkDanger = (flood, data) => {
    let isDanger = false;
    for (let i = 0; i < flood.length; i += 10) {
      const checkFlood = false;
      const f = flood[i];
      const pointFlood = {
        longitude: f.longitude,
        latitude: f.latitude,
      };

      for (let j = 0; j < data.points.length; j += 100) {
        const p = data.points[j];
        const d = distance(p, pointFlood);
        if (d < 500) {
          data.strokeColor = Colors.red600;
          checkFlood = true;
          placrApi
            .searchLocation(pointFlood)
            .then((res) => {
              dispatch(
                setFloodingSituation({
                  name: res.display_name,
                  description: 'Nguy hiểm (không thể đi qua)',
                  level: 2,
                })
              );
            })
            .catch((err) => console.log('searchLocation err:', err));
          break;
        }
      }

      if (checkFlood) {
        isDanger = true;
        break;
      }
    }
    return isDanger;
  };

  const legsDirection = (legs) => {
    return legs.map((leg, index) => {
      const [steps, stepGeometry] = stepsDirection(leg.steps);

      const data = {
        strokeColor: Colors.gray300,
        strokeWidth: 8,
        points: steps.reduce(function (prev, next) {
          return prev.concat(next);
        }),
        steps: stepGeometry,
      };

      // const check = (point) => {
      //   const d = distance(point, markerDanger.points[0]);
      //   if (d < 100) {
      //     data.strokeColor = Colors.red600;
      //     return true;
      //   }
      // };
      // let check = checkDanger(flood3, data);
      // if (!check) check = checkDanger(flood2, data);
      // if (!check) {
      //   dispatch(setFloodingSituation(null));
      // }

      if (checkDanger(flood3, data)) return data;
      else if (checkDanger(flood2, data)) return data;
      else dispatch(setFloodingSituation(null));
      // data.points.some(check);

      // console.log(data.points);

      return data;
    });
  };

  const stepsDirection = (steps) => {
    const routeInfor = [];
    const data = steps.map((step, index) => {
      const data = polylineMap.decode(step.geometry);

      routeInfor.push(step);

      return data.map((item) => {
        return { latitude: item[0], longitude: item[1] };
      });
    });

    return [data, routeInfor];
  };

  function getDirectionInfo(data) {
    const index = polylines.length > 0 ? polylines.length - 1 : 0;
    return {
      // weight: data.routes[index].weight,
      duration: `${Number(data.routes[index].duration / 60).toFixed()} p`,
      distance: `${Number(data.routes[index].distance / 1000).toFixed()} km`,
    };
  }

  const fetchDirection = useCallback(async () => {
    try {
      const result = await directionApi.direction(markerLocation);
      const routes = result.routes.map((route, index) => {
        return legsDirection(route.legs);
      });

      dispatch(setPolylines([...routes.reverse()]));
    } catch (error) {
      console.log(error);
    }
  }, [markerLocation]);

  const fetchDirectionInfo = useCallback(async () => {
    try {
      const getDirectionBike = directionApi.infoDirection(markerLocation, DRIVING.BIKE);
      const getDirectionCar = directionApi.infoDirection(markerLocation, DRIVING.CAR);
      const getDirectionFoot = directionApi.infoDirection(markerLocation, DRIVING.FOOT);

      const [directionBike, directionCar, directionFoot] = await Promise.all([
        getDirectionBike,
        getDirectionCar,
        getDirectionFoot,
      ]);

      const infoDirection = [];
      infoDirection.push(getDirectionInfo(directionBike));
      infoDirection.push(getDirectionInfo(directionCar));
      infoDirection.push(getDirectionInfo(directionFoot));

      dispatch(setDirectionInfors(infoDirection));
    } catch (error) {
      console.log(error);
    }
  }, [markerLocation, polylines]);

  useEffect(() => {
    if (markerLocation.length > 1) {
      fetchDirection();
      fetchDirectionInfo();
    } else {
      dispatch(setPolylines([]));
    }
  }, [markerLocation, fetchDirection]);

  // useEffect(() => {
  //   if (polylines[polylines.length - 1].strokeColor === Colors.red600) {
  //     setIsDanger(true);
  //   } else {
  //     setIsDanger(false);
  //   }
  // }, [polylines]);

  const distance = (point1, point2) => {
    const lat1 = point1.latitude;
    const lon1 = point1.longitude;
    const lat2 = point2.latitude;
    const lon2 = point2.longitude;
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // in metres
    return d.toFixed();
  };

  return (
    <ScrollView>
      <View paddingH-s6 paddingB-s3>
        <View marginV-s3 marginH-s1>
          <View
            width={0}
            height="100%"
            absL
            marginL-11
            style={{
              borderColor: Colors.gray300,
              borderWidth: 0.5,
              borderStyle: 'dashed',
              borderRadius: 1,
            }}
          />
          {polylines.length > 0 &&
            polylines[polylines.length - 1].map((polyline) => {
              return polyline.steps?.map((step, index) => {
                return (
                  <View key={index} paddingB-s6>
                    <TouchableOpacity row activeOpacity={0.6}>
                      <IconSvg name="SendCircleSVG" color={Colors.gray500} width={24} height={24} />
                      <Text gray500 regular marginL-s2>
                        {osrmTextInstructions('v5').compile('vi', step)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              });
            })}
        </View>
        <View row>
          <View
            row
            centerV
            padding-s2
            br4
            style={{
              borderColor:
                polylines.length > 0 && polylines[polylines.length - 1][0].strokeColor === Colors.red600
                  ? Colors.red600
                  : Colors.green500,
              borderWidth: 0.5,
            }}
          >
            <Text
              regular
              color={
                polylines.length > 0 && polylines[polylines.length - 1][0].strokeColor === Colors.red600
                  ? Colors.red600
                  : Colors.green500
              }
            >
              {polylines.length > 0 && polylines[polylines.length - 1][0].strokeColor === Colors.red600
                ? 'Đường đi nguy hiểm'
                : 'Đường đi an toàn'}
            </Text>
            <IconSvg
              name={
                polylines.length > 0 && polylines[polylines.length - 1][0].strokeColor === Colors.red600
                  ? 'ReportProblemSVG'
                  : 'DoneSVG'
              }
              color={Colors.gray500}
              width={24}
              height={24}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default React.memo(Direction);
