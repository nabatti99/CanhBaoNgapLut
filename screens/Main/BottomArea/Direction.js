import React, { useEffect, useState } from 'react';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';

import { setPolylines, setDirectionInfors, setMarkerLocation } from '../store/mapStore';
import IconSvg from '../../../components/IconSVG';
import * as directionApi from '../../../apis/direction.api';
import polylineMap from '@mapbox/polyline';
import osrmTextInstructions from 'osrm-text-instructions';
import { ScrollView } from 'react-native';
import { useCallback } from 'react';

function Direction() {
  const [isDanger, setIsDanger] = useState(false); // false is not danger

  const dispatch = useDispatch();

  const markerLocation = useSelector((state) => state.markerLocation);
  const markerDanger = useSelector((state) => state.markerDanger);
  const directionInfors = useSelector((state) => state.directionInfors);
  const polylines = useSelector((state) => state.polylines);

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

      const check = (point) => {
        const d = distance(point, markerDanger.points[0]);
        if (d < 100) {
          data.strokeColor = Colors.red600;
          return true;
        }
      };

      data.points.some(check);

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

  const fetchDirection = useCallback(async () => {
    try {
      const result = await directionApi.direction(markerLocation);

      const routes = result.routes.map((route, index) => {
        const routeInfor = {
          summary: route.legs[0].summary,
          weight: route.legs[0].weight,
          duration: route.legs[0].duration,
          distance: route.legs[0].distance,
          steps: [],
        };

        return legsDirection(route.legs);

        // routeInfors.routes.push(routeInfor);
      });

      // dispatch(setDirectionInfors({ ...routeInfors }));
      dispatch(setPolylines([...routes.reverse()]));
    } catch (error) {
      console.log(error);
    }
  }, [markerLocation]);

  useEffect(() => {
    if (markerLocation.length > 1) {
      fetchDirection();
      console.log('?????t m???e m??y');
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
    const ??1 = (lat1 * Math.PI) / 180; // ??, ?? in radians
    const ??2 = (lat2 * Math.PI) / 180;
    const ???? = ((lat2 - lat1) * Math.PI) / 180;
    const ???? = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(???? / 2) * Math.sin(???? / 2) + Math.cos(??1) * Math.cos(??2) * Math.sin(???? / 2) * Math.sin(???? / 2);
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
              borderColor: isDanger ? Colors.red600 : Colors.green500,
              borderWidth: 0.5,
            }}
          >
            <Text regular color={isDanger ? Colors.red600 : Colors.green500}>
              {isDanger ? '???????ng ??i nguy hi???m' : '???????ng ??i an to??n'}
            </Text>
            <IconSvg name="DoneSVG" color={Colors.gray500} width={24} height={24} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Direction;
