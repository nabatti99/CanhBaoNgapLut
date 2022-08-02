import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';

const ItemSearchPlace = ({ isHis = false, item, onPress, removeSearchHis }) => {
  const { display_name, duration, distance } = item;

  return (
    <TouchableOpacity onPress={onPress}>
      <View paddingR-s3 paddingV-s2 row centerV spread width={'100%'}>
        <View marginR-s2>
          <IconSvg name={isHis ? 'HistorySVG' : 'LocationOnSVG'} width={30} height={30} color={Colors.gray500} />
        </View>
        <View flexG width={'80%'}>
          <Text strong gray500 numberOfLines={2}>
            {display_name}
          </Text>
          <View row marginT-s1 centerV>
            <View row marginR-s3 centerV>
              <IconSvg name={'MutipleStopSVG'} />
              <Text gray500 marginL-s1>
                {Number(distance / 1000).toFixed(1)} km
              </Text>
            </View>
            <View row marginR-s3 centerV>
              <IconSvg name={'ScheduleSVG'} />
              <Text gray500 marginL-s1>
                {Number(duration / 60).toFixed(1)} phút
              </Text>
            </View>
            <View row marginR-s3 centerV>
              <IconSvg name={'CarSVG'} />
              {/* <Text gray500 marginL-s1>
                2.3 km
              </Text> */}
            </View>
          </View>
        </View>
        <View flexG style={{ alignItems: 'flex-end' }}>
          {isHis ? (
            <IconSvg name={'ClearSVG'} width={22} height={22} color={Colors.gray500} onPress={removeSearchHis} />
          ) : (
            <IconSvg name={'ArrowRightSVG'} width={22} height={22} color={Colors.gray500} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSearchPlace;
