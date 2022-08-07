import React, { useEffect } from 'react';
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
  const markerLocation = useSelector((state) => state.markerLocation);

  return (
    <BottomPanel isShowCompoent={isShowCompoent}>
      <View
        width={WIDTH}
        centerV
        style={{ position: 'absolute', marginTop: 60, opacity: markerLocation.length < 2 ? 1 : 0 }}
      >
        <Text gray500 strong center>
          Tìm kiếm hoặc chọn vị trí trên bản đồ
        </Text>
        <Text gray500 strong center>
          Lướt sang trái để xem mức độ nguy hiểm
        </Text>
      </View>
      {markerLocation.length > 1 && (
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
          <View width={WIDTH} height="100%">
            <View row center paddingB-s2 style={{ borderBottomColor: Colors.gray300, borderBottomWidth: 1 }}>
              <IconSvg name={'ReportProblemSVG'} width={31} height={31} />
              <Text gray500 strong>
                Tình trạng ngập lụt hiện tại
              </Text>
            </View>
            <View>
              {floodingSituation && floodingSituation.level > 0 ? (
                <ItemFloodSituation data={floodingSituation} />
              ) : (
                <Text gray500 center style={{ fontSize: 40 }}>
                  An toàn
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </BottomPanel>
  );
}

export default React.memo(BottomArea);
