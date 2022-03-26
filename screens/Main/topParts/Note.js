import React, { useState } from 'react';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';
import CheckBoxNote from './CheckBoxNote';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Note = () => {
  const [isShown, setIsShown] = useState(false);
  const widthAnimated = useSharedValue(36);
  const heightAnimated = useSharedValue(36);
  const animatedView = useAnimatedStyle(() => ({
    height: heightAnimated.value,
    width: widthAnimated.value,
  }));
  const handleClick = () => {
    widthAnimated.value = withTiming(isShown ? 30 : 138, { duration: 300 });
    heightAnimated.value = withTiming(isShown ? 30 : 92, { duration: 300 });
    setIsShown(!isShown);
  };
  return (
    <Animated.View style={[animatedView, { overflow: 'hidden', padding: 4 }]} backgroundColor={Colors.white}>
      <View row centerV>
        <TouchableOpacity onPress={handleClick}>
          <IconSvg name={'CoffeeSVG'} width={24} height={24} />
        </TouchableOpacity>
        <Text strong gray700 marginL-8>
          Chú thích
        </Text>
        <CheckBoxNote />
      </View>
      <View height={0.3} width='90%' backgroundColor={Colors.gray300} margin-4 />
      <View>
        <View row paddingV-2 centerV>
          <IconSvg name={'CoffeeSVG'} />
          <Text marginL-8 cyan500 regular>
            Ngập lụt
          </Text>
        </View>
        <View row paddingV-4 centerV>
          <IconSvg name={'CoffeeSVG'} color={Colors.blue500} />
          <Text marginL-8 blue500 regular>
            Có mưa
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default Note;
