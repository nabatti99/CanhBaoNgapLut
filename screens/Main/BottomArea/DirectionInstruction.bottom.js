import React, { useEffect } from 'react';
import { BorderRadiuses, Colors, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';

import { setPolylines, setMarker, setTopInput } from '../store/mapStore';
import IconSvg from '../../../components/IconSVG';

function DirectionInstruction() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(
    //   setPolylines([
    //     ...[
    //       {
    //         strokeColor: Colors.blue300,
    //         strokeWidth: 4,
    //         points: [
    //           { latitude: 15.3, longitude: 108.8 },
    //           { latitude: 15.2, longitude: 108.9 },
    //           { latitude: 15.1, longitude: 108.85 },
    //           { latitude: 15.05, longitude: 108.75 },
    //         ],
    //       },
    //     ],
    //   ])
    // );

    dispatch(
      setMarker({
        image: null,
        points: [
          { latitude: 15.3, longitude: 108.8 },
          { latitude: 15.05, longitude: 108.75 },
        ],
      })
    );

    dispatch(
      setTopInput({
        label: 'Vị trí bắt đầu',
        value: 'Bưu điện Thành Phố Tam Kỳ',
        leftIconName: 'CurrentLocationSVG',
        placeholder: '',
      })
    );
  }, []);

  return (
    <View>
      <View marginV-s3 marginH-s1>
        <View
          width={0}
          height='100%'
          absL
          marginL-11
          style={{
            borderColor: Colors.gray300,
            borderWidth: 0.5,
            borderStyle: 'dashed',
          }}
        />
        <View paddingV-s6>
          <TouchableOpacity row activeOpacity={0.6}>
            <IconSvg name='SendCircleSVG' color={Colors.gray500} width={24} height={24} />
            <Text gray500 regular marginL-s2>
              Hướng dẫn đi đường
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View row marginB-s4>
        <Image
          assetGroup='demo'
          assetName='coffee'
          resizeMode='cover'
          style={{
            borderRadius: BorderRadiuses.br8,
          }}
          width={86}
          height={86}
          marginR-s3
        />

        <View flexG>
          <View row centerV>
            <Text h3 gray700 marginR-s2>
              Mr.Good Tea &amp; Coffee
            </Text>
            <View marginT-s1>
              <IconSvg name='CoffeeSVG' color={Colors.gray500} width={16} height={16} />
            </View>
          </View>

          <Text regular gray500 marginT-s1>
            883 Tôn Đức Thắng, Quảng Nam
          </Text>

          <View row centerV marginT-s3 marginR-s2>
            <View row centerV marginR-s3>
              <IconSvg name='SendSVG' color={Colors.blue500} />
              <Text small blue500 marginL-s1>
                1.2 km
              </Text>
            </View>

            <View bg-green100 br100 paddingH-s2 paddingB-2 marginR-s3>
              <Text green500 small>
                An toàn
              </Text>
            </View>

            <View row>
              <IconSvg name='CarFrontSVG' color={Colors.gray500} />
              <View
                width={0}
                height={16}
                marginH-s2
                style={{
                  borderColor: Colors.gray500,
                  borderWidth: 0.5,
                }}
              />
              <IconSvg name='MotorBikeSVG' color={Colors.gray500} />
            </View>
          </View>
        </View>
      </View>

      <View row>
        <View
          row
          centerV
          br4
          paddingH-s2
          paddingV-s1
          style={{
            borderColor: Colors.gray500,
            borderWidth: 1,
          }}
        >
          <Text regular gray500 marginR-s2>
            2 tuyến đường khác
          </Text>
          <IconSvg name='ExpandMoreSVG' color={Colors.gray500} width={16} height={16} />
        </View>
      </View>
    </View>
  );
}

export default DirectionInstruction;
