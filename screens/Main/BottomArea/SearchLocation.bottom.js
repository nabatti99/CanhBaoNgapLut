import React from 'react';
import { BorderRadiuses, Colors, Image, Shadows, Text, View } from 'react-native-ui-lib';

import TopInput from '../components/UI/TopInput.ui';
import BottomPanelMain from '../components/BottomPanel.main';
import { SearchSVG, CoffeeSVG, StarFillSVG, StarOutlineSVG, ArrowRightSVG } from '../../../config/loadSvg';

function SearchLocation() {
  return (
    <View>
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
        <View flexG>
          <View row centerV>
            <Text h3 gray700 marginR-s2>
              Mr.Good Tea &amp; Coffee
            </Text>
            <View marginT-s1>
              <CoffeeSVG color={Colors.gray500} width={16} height={16} />
            </View>
          </View>

          <Text regular gray500>
            883 Tôn Đức Thắng, Quảng Nam
          </Text>

          <View row spread centerV>
            <View row>
              <View marginR-s1>
                <StarFillSVG color={Colors.yellow400} width={16} height={16} />
              </View>
              <View marginR-s1>
                <StarFillSVG color={Colors.yellow400} width={16} height={16} />
              </View>
              <View marginR-s1>
                <StarFillSVG color={Colors.yellow400} width={16} height={16} />
              </View>
              <View marginR-s1>
                <StarFillSVG color={Colors.yellow400} width={16} height={16} />
              </View>
              <View marginR-s1>
                <StarOutlineSVG color={Colors.gray500} width={16} height={16} />
              </View>
            </View>

            <View right>
              <ArrowRightSVG color={Colors.blue500} width={24} height={24} />
              <Text small blue500>
                1.2 km
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SearchLocation;
