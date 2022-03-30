import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { BorderRadiuses, Colors, Image, Text, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';

import IconSvg from '../../../components/IconSVG';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function StartAddress() {
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(
  //       setTopInput({
  //         label: '',
  //         value: '',
  //         leftIconName: 'CurrentLocationSVG',
  //         placeholder: 'Địa điểm bạn muốn bắt đầu',
  //       })
  //     );
  //   }, []);
  const ItemAddress = () => {
    return (
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
        <View flexG spread>
          <View>
            <View row centerV>
              <Text h3 gray700 marginR-s2>
                Mr.Good Tea &amp; Coffee
              </Text>
              <View marginT-s1>
                <IconSvg name='CoffeeSVG' color={Colors.gray500} />
              </View>
            </View>

            <Text regular gray500>
              883 Tôn Đức Thắng, Quảng Nam
            </Text>
          </View>

          <View row centerV>
            <View marginR-s1>
              <IconSvg name='StarFillSVG' color={Colors.yellow400} />
            </View>
            <View marginR-s1>
              <IconSvg name='StarFillSVG' color={Colors.yellow400} />
            </View>
            <View marginR-s1>
              <IconSvg name='StarFillSVG' color={Colors.yellow400} />
            </View>
            <View marginR-s1>
              <IconSvg name='StarFillSVG' color={Colors.yellow400} />
            </View>
            <View marginR-s1>
              <IconSvg name='StarOutlineSVG' color={Colors.gray500} />
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View flex>
      <View row marginT-s4>
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
        <View flexG spread>
          <View>
            <Text h3 gray700 marginR-s2>
              Mr.Good Tea &amp; Coffee
            </Text>
            <Text regular gray500>
              883 Tôn Đức Thắng, Quảng Nam
            </Text>
          </View>

          <View row centerV>
            <IconSvg name={'CoffeeSVG'} color={Colors.blue500} />
            <Text marginL-4 blue500 marginR-13>
              Điểm đến
            </Text>
            <IconSvg name={'CoffeeSVG'} color={Colors.gray500} />
          </View>
        </View>
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        data={list}
        renderItem={ItemAddress}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default StartAddress;
