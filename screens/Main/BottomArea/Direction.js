import React, { useEffect } from 'react';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';

import { setPolylines, setDirectionInfor, setMarkerLocation } from '../store/mapStore';
import IconSvg from '../../../components/IconSVG';
import * as directionApi from '../../../apis/direction.api';
import polylineMap from '@mapbox/polyline';

function Direction() {
  const dispatch = useDispatch();

  const markerLocation = useSelector((state) => state.markerLocation);
  const markerDanger = useSelector((state) => state.markerDanger);
  const polylines = useSelector((state) => state.polylines);

  const fetchDirection = async () => {
    try {
      const result = await directionApi.direction(markerLocation);

      const directionInfor = {
        weight: result.routes[0].weight,
        duration: result.routes[0].duration,
        distance: result.routes[0].distance,
        steps: [{ 'Điếm đi': result.waypoints[0].name }],
      };
      // dispatch(
      //   setDirectionInfor({
      //     weight: result.routes[0].weight,
      //     duration: result.routes[0].duration,
      //     distance: result.routes[0].distance,
      //     steps: [

      //     ]
      //   })
      // );

      // setDirectionStep();

      const steps = result.routes.map((route, index) => {
        const points = route.legs[0].steps.map((step) => {
          const data = polylineMap.decode(step.geometry);
          return data.map((item) => {
            return { latitude: item[0], longitude: item[1] };
          });
        });

        const data = {
          strokeColor: index == 0 ? Colors.blue300 : Colors.gray300,
          // strokeColor: Colors.blue300,
          strokeWidth: 4,
          points: points.reduce(function (prev, next) {
            return prev.concat(next);
          }),
        };

        const check = (point) => {
          const d = distance(point, markerDanger.points[0]);
          console.log(d);

          if (d < 100) {
            data.strokeColor = Colors.red600;
            return true;
          }
        };

        data.points.some(check);

        return data;
      });

      dispatch(setPolylines([...steps.reverse()]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (markerLocation.length > 1) {
        fetchDirection();
        // markerDanger.points.forEach((point) => {});
      }
    } catch (error) {
      console.log(error);
    }
  }, [markerLocation]);

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
    <View paddingH-s6>
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
        <View paddingB-s6>
          <TouchableOpacity row activeOpacity={0.6}>
            <IconSvg name="SendCircleSVG" color={Colors.gray500} width={24} height={24} />
            <Text gray500 regular marginL-s2>
              Hướng dẫn đi đường
            </Text>
          </TouchableOpacity>
        </View>
        <View paddingB-s6>
          <TouchableOpacity row activeOpacity={0.6}>
            <IconSvg name="SendCircleSVG" color={Colors.gray500} width={24} height={24} />
            <Text gray500 regular marginL-s2>
              Hướng dẫn đi đường
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View row>
        <View
          row
          centerV
          padding-s2
          br4
          style={{
            borderColor: Colors.green500,
            borderWidth: 0.5,
          }}
        >
          <Text regular green500>
            Đường đi an toàn
          </Text>
          <IconSvg name="DoneSVG" color={Colors.gray500} width={24} height={24} />
        </View>
      </View>
    </View>
  );
}

export default Direction;
