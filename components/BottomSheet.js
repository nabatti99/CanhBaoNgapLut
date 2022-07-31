import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useImperativeHandle, useState } from 'react';
import { HEIGHT } from '../constants/constant';

import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Spacings, BorderRadiuses } from 'react-native-ui-lib';

const BottomSheet = React.forwardRef(({ HeaderComponent, FooterComponent, children, onCloseBottomSheet }, ref) => {
  const [heightLayout, setHeightLayout] = useState(0);

  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const context = useSharedValue({ y: 0 });

  const scrollTo = useCallback((destination) => {
    'worklet';
    active.value = destination !== 0;

    translateY.value = withTiming(destination);

    if (destination === 0 && onCloseBottomSheet) {
      runOnJS(onCloseBottomSheet)();
    }
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  const heightLayoutCurrent = useCallback(() => {
    return heightLayout;
  }, [heightLayout]);

  useImperativeHandle(ref, () => ({ scrollTo, isActive, heightLayoutCurrent }), [
    scrollTo,
    isActive,
    heightLayoutCurrent,
  ]);

  const gesture = Gesture.Pan()
    .onStart((e) => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -heightLayout);
    })
    .onEnd(() => {
      if (translateY.value > -heightLayout + heightLayout / 3) {
        scrollTo(0);
      } else {
        scrollTo(-heightLayout);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  }, []);

  const rBottomSheetContainerStyle = useAnimatedStyle(() => {
    return {
      // backgroundColor: interpolateColor(translateY.value, [-heightLayout, 0], ['#00000080', Colors.transparent]),
      zIndex: interpolate(translateY.value, [-heightLayout, 0], [100, -1]),
      elevation: interpolate(translateY.value, [-heightLayout, 0], [10, -1]),
    };
  }, []);

  const getHeightLayout = useCallback((e) => {
    const { height } = e.nativeEvent.layout;
    setHeightLayout(height);
  }, []);

  return (
    <Animated.View style={[styles.container, rBottomSheetContainerStyle]}>
      {/* <Pressable onPress={() => scrollTo(0)}>
        <View width={'100%'} height={'100%'} />
      </Pressable> */}
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <View onLayout={getHeightLayout}>
              {HeaderComponent}
              {children}
              {FooterComponent}
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Animated.View>
    </Animated.View>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bottomSheetContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadiuses.br12,
    borderTopRightRadius: BorderRadiuses.br12,
    overflow: 'hidden',
    position: 'absolute',
    top: HEIGHT,
    left: 0,
    right: 0,
  },
  inputComment: {
    flexGrow: 1,
    paddingLeft: Spacings.s2,

    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    backgroundColor: Colors.transparent,
  },
});
