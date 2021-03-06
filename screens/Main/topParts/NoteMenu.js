import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Text, TouchableOpacity, View, Shadows, BorderRadiuses } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';
import CheckBoxNote from './CheckBoxNote';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const NoteMenu = () => {
  const [isShown, setIsShown] = useState(false);
  const widthAnimated = useSharedValue(32);
  const heightAnimated = useSharedValue(32);

  const animatedView = useAnimatedStyle(() => {
    return {
      height: heightAnimated.value,
      width: widthAnimated.value,
    };
  }, []);

  const handleClick = () => {
    widthAnimated.value = withTiming(isShown ? 32 : 138, { duration: 150 });
    heightAnimated.value = withTiming(isShown ? 32 : 92, { duration: 150 });
    setIsShown(!isShown);
  };
  return (
    <Animated.View style={[animatedView, styles.container]} backgroundColor={Colors.white}>
      <View row centerV>
        <IconSvg name={'DetailsSVG'} width={24} height={24} onPress={handleClick} />
        <Text strong gray700 marginL-8 numberOfLines={1}>
          Chú thích
        </Text>
        <CheckBoxNote />
      </View>
      <View height={0.3} width="90%" backgroundColor={Colors.gray300} margin-4 />
      <View>
        <View row paddingV-2 centerV>
          <IconSvg name={'WarningSVG'} color={Colors.cyan500} />
          <Text marginL-8 cyan500 regular>
            Ngập lụt
          </Text>
        </View>
        <View row paddingV-4 centerV>
          <IconSvg name={'CloudSVG'} color={Colors.blue500} />
          <Text marginL-8 blue500 regular>
            Có mưa
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default NoteMenu;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    padding: 4,
    borderRadius: 4,
    ...Shadows.md,
  },
});
