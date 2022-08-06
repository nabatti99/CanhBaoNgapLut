import { StyleSheet } from 'react-native';
import React from 'react';
import { BorderRadiuses, Colors, Spacings, Text, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';
import { WIDTH } from '../../../constants/constant';

const ItemFloodSituation = ({ data }) => {
  const levelStyle = {
    backgroundColor: data.level === 2 ? Colors.red50 : Colors.yellow50,
    borderColor: data.level === 2 ? Colors.red500 : Colors.yellow500,
  };

  const colorText = {
    color: data.level === 2 ? Colors.red500 : Colors.yellow500,
  };

  const content = data.level === 2 ? 'Nguy hiểm (không thể đi qua)' : 'Cẩn thận (Đi chậm, Quan sát kỹ)';

  return (
    <View style={styles.container}>
      <View style={[styles.icon, levelStyle]}>
        <IconSvg name={'ReportProblemSVG'} width={31} height={31} />
      </View>
      <View style={styles.content}>
        <Text gray500 numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={colorText} strong>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default ItemFloodSituation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacings.s4,
  },
  icon: {
    width: 62,
    height: 62,
    borderRadius: BorderRadiuses.br100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red50,
    borderWidth: 2,
    borderColor: Colors.red500,
  },
  content: {
    marginLeft: Spacings.s2,
    flexGrow: 1,
    flex: 1,
  },
});
