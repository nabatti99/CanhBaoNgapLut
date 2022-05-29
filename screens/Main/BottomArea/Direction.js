import React, { useEffect } from 'react';
import { BorderRadiuses, Colors, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';

import { setPolylines, setDirectionInfor } from '../store/mapStore';
import IconSvg from '../../../components/IconSVG';
import * as directionApi from '../../../apis/direction.api';
import polylineMap from '@mapbox/polyline';

function Direction() {
  const dispatch = useDispatch();
  const markerLocation = useSelector((state) => state.markerLocation);

  const fetchDirection = async () => {
    try {
      const result = await directionApi.direction(markerLocation);

      dispatch(
        setDirectionInfor({
          weight: result.routes[0].weight,
          duration: result.routes[0].duration,
          distance: result.routes[0].distance,
        })
      );

      // setDirectionStep();

      const steps = result.routes[0].legs.map((leg, index) => {
        const points = leg.steps.map((step) => {
          const data = polylineMap.decode(step.geometry);
          return data.map((item) => {
            return { latitude: item[0], longitude: item[1] };
          });
        });

        return {
          // strokeColor: index == 0 ? Colors.blue300 : Colors.gray300,
          strokeColor: Colors.blue300,
          strokeWidth: 4,
          points: points.reduce(function (prev, next) {
            return prev.concat(next);
          }),
        };
      });
      console.log('fetchDirection');
      dispatch(setPolylines([...steps]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('markerLocation', markerLocation);
    if (markerLocation.length > 1) fetchDirection();
  }, [markerLocation]);

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
