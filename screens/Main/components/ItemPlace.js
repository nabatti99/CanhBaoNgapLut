import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { BorderRadiuses, Colors, Shadows, Text, View, Spacings } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';
import { WIDTH } from '../../../constants/constant';
import Animated, {
  FadeInUp,
  FadeOutUp,
  interpolate,
  Layout,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
} from 'react-native-reanimated';

const ITEM_SIZE = 40;

const ItemPlace = ({ index, item, translationY, onPress, onPressRemove }) => {
  // console.log(item);
  // if ('name' in item === false) {
  //   item.name = `${Number(item.coordinate.latitude).toFixed(5)}, ${Number(item.coordinate.longitude).toFixed(5)}`;
  // }
  // if ('currentPosition' in item === false) {
  //   item.currentPosition = false;
  // }
  const { name, coordinate, currentPosition } = item;
  const itemStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translationY.value, [-1, 0, index * ITEM_SIZE, (index + 1.5) * ITEM_SIZE], [1, 1, 1, 0]),
    };
  }, []);
  return (
    <Animated.View
      style={itemStyle}
      entering={FadeInUp.delay(300 * index)}
      exiting={FadeOutUp}
      layout={Layout.delay(100)}
    >
      <TouchableOpacity onPress={onPress}>
        <View row backgroundColor={Colors.white} height={ITEM_SIZE} marginB-s2 centerV on>
          <View width={28} />
          {/* <IconSvg name={'ClearSVG'} width={28} height={28} color={Colors.blue500} /> */}
          <View row centerV flexS style={styles.container} flex>
            <View>
              <IconSvg
                name={currentPosition ? 'CurrentLocationSVG' : 'NearMeSVG'}
                width={28}
                height={28}
                color={Colors.blue500}
              />
            </View>
            <View flexG paddingL-s2 width={'60%'}>
              <Text regular gray500 numberOfLines={1}>
                {name || `${Number(coordinate.latitude).toFixed(5)}, ${Number(coordinate.longitude).toFixed(5)}`}
              </Text>
            </View>
            <View>
              <IconSvg name={'ClearSVG'} width={24} height={24} onPress={onPressRemove} />
            </View>
            <View>
              <IconSvg name={'DragIndicatorSVG'} width={28} height={28} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ItemPlace;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.gray500,
    borderBottomWidth: 0.2,
    marginBottom: Spacings.s2,
    paddingBottom: Spacings.s2,
    marginLeft: Spacings.s2,
  },
});
