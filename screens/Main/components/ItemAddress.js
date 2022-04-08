import React from 'react';
import { BorderRadiuses, Colors, Image, Text, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';

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

export default ItemAddress;
