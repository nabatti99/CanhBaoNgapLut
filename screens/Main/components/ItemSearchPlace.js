import { StyleSheet } from 'react-native';
import React from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';

const ItemSearchPlace = ({ item }) => {
  const { display_name } = item;
  const styles = StyleSheet.create({
    container: {
      // borderBottomColor: Colors.gray500,
      // borderBottomWidth: isLast ? 0 : 0.5,
    },
  });

  return (
    <View paddingH-s3 paddingV-s2 row style={styles.container} centerV>
      <View column width={'90%'}>
        <Text strong gray500 numberOfLines={2}>
          {display_name}
        </Text>
        <View row marginT-s1 centerV>
          <View row marginR-s3 centerV>
            <IconSvg name={'MutipleStopSVG'} />
            <Text gray500 marginL-s1>
              2.3 km
            </Text>
          </View>
          <View row marginR-s3 centerV>
            <IconSvg name={'ScheduleSVG'} />
            <Text gray500 marginL-s1>
              2.3 km
            </Text>
          </View>
          <View row marginR-s3 centerV>
            <IconSvg name={'CarSVG'} />
            <Text gray500 marginL-s1>
              2.3 km
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexGrow: 1, alignItems: 'flex-end' }}>
        <IconSvg name={'ArrowRightSVG'} width={24} height={24} />
      </View>
    </View>
  );
};

export default ItemSearchPlace;
