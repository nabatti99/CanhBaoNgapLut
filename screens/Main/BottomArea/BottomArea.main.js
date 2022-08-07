import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleTopInputChanged } from '../store/mapStore';
import BottomPanel from '../components/BottomPanel.main';
import TopInput from '../components/UI/TopInput.ui';
import DirectionInstruction from './DirectionInstruction.bottom';
import SearchLocation from './SearchLocation.bottom';
import StartLocation from './StartLocation';
import LocationDetail from './LocationDetail';
import Direction from './Direction';
import IconSvg from '../../../components/IconSVG';
import { Text, View, Image, Assets, Colors } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { WIDTH } from '../../../constants/constant';
import ItemFloodSituation from '../components/ItemFloodSituation';

function BottomArea({ isShowCompoent }) {
  const floodingSituation = useSelector((state) => state.floodingSituation);

  return (
    <BottomPanel isShowCompoent={isShowCompoent}>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={true}
      >
        <View width={WIDTH} height="100%">
          <View row center paddingB-s2 style={{ borderBottomColor: Colors.gray300, borderBottomWidth: 1 }}>
            <Text gray500 strong>
              Kéo biểu tượng
            </Text>
            <Image source={Assets.marker.locationPoint} />
            <Text gray500 strong>
              để xác định tuyến tường
            </Text>
          </View>
          <Direction />
        </View>
        {floodingSituation && floodingSituation.level > 0 ? (
          <View width={WIDTH} height="100%">
            <View row center paddingB-s2 style={{ borderBottomColor: Colors.gray300, borderBottomWidth: 1 }}>
              <IconSvg name={'ReportProblemSVG'} width={31} height={31} />
              <Text gray500 strong>
                Tình trạng ngập lụt hiện tại
              </Text>
            </View>
            <View>
              <ItemFloodSituation data={floodingSituation} />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </BottomPanel>
  );
}

export default BottomArea;
