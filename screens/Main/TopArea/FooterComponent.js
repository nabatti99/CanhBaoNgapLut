import React from 'react';
import { useCallback } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import IconSvg from '../../../components/IconSVG';
import { TYPE_SHOW_TOP_COMPOENT } from '../../../constants/constant';
import { setShowTopComponent } from '../store/mapStore';

const FooterComponent = () => {
  const dispatch = useDispatch();
  const directionInfors = useSelector((state) => state.directionInfors);

  const handleClickAddMarker = useCallback(() => {
    dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.SEARCH_SHEET));
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={handleClickAddMarker}>
        <View row marginL-s9 paddingB-s3 centerV>
          <IconSvg name={'ControlPointSVG'} width={28} height={28} color={Colors.blue500} />
          <Text marginL-s2 regular gray400>
            Thêm điểm đến
          </Text>
        </View>
      </TouchableOpacity>

      <View paddingB-s2 spread row paddingH-s2>
        <View row centerV marginR-s2>
          <IconSvg name={'CarFrontSVG'} width={24} height={24} />
          <Text marginL-s1>{directionInfors[0]?.distance}</Text>
        </View>
        {directionInfors?.map((d, index) => {
          return (
            <View row key={index} centerV marginR-s2>
              <IconSvg name={'CarFrontSVG'} width={24} height={24} />
              <Text marginL-s1>{d.duration}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(FooterComponent);
