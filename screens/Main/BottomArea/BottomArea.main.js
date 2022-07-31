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

function BottomArea() {
  // const dispatch = useDispatch();

  // const value = useSelector((state) => state.topInput.value);
  // const leftIconName = useSelector((state) => state.topInput.leftIconName);
  // const placeholder = useSelector((state) => state.topInput.placeholder);
  // const label = useSelector((state) => state.topInput.label);

  return (
    <BottomPanel>
      <View row center paddingB-s2 style={{ borderBottomColor: Colors.gray300, borderBottomWidth: 1 }}>
        <Text gray500 strong>
          Kéo biểu tượng
        </Text>
        <Image source={Assets.marker.locationPoint} />
        <Text gray500 strong>
          để xác định tuyến tường
        </Text>
      </View>

      {<Direction />}
    </BottomPanel>
  );
}

export default BottomArea;
