import React from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { BorderRadiuses, Colors, Shadows, Text, View } from 'react-native-ui-lib';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { HEIGHT, STATUSBAR_HEIGHT } from '../../../constants/constant';
import { useCallback, useEffect } from 'react';
import { setBottomSheetFullScreen } from '../store/mapStore';
import { useDispatch, useSelector } from 'react-redux';

const windowHeight = Dimensions.get('screen').height;

function BottomPanel({ children, isShowCompoent }) {
  const dispatch = useDispatch();
  const bottomSheetFullScreen = useSelector((state) => state.bottomSheetFullScreen);
  // Setup Pan Gesture => height of Bottom Panel
  const BEGIN_HEIGHT = 218;
  const heightAnimated = useSharedValue(0);

  const panAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: heightAnimated.value,
      borderTopLeftRadius: interpolate(heightAnimated.value, [BEGIN_HEIGHT, HEIGHT - STATUSBAR_HEIGHT], [BorderRadiuses.br16, 0]),
      borderTopRightRadius: interpolate(heightAnimated.value, [BEGIN_HEIGHT, HEIGHT - STATUSBAR_HEIGHT], [BorderRadiuses.br16, 0]),
      overflow: 'hidden',
    };
  }, []);

  useEffect(() => {
    heightAnimated.value = withTiming(isShowCompoent ? BEGIN_HEIGHT : 0);
  }, [isShowCompoent]);

  const changeStatusBar = (s) => {
    StatusBar.setBackgroundColor(s ? Colors.white : Colors.transparent);
    dispatch(setBottomSheetFullScreen(s));
  };

  const scrollTo = useCallback((destination) => {
    'worklet';

    if (destination === HEIGHT - STATUSBAR_HEIGHT) runOnJS(changeStatusBar)(true);
    else runOnJS(changeStatusBar)(false);

    heightAnimated.value = withTiming(destination, { duration: 300 });
  }, []);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      heightAnimated.value = windowHeight - event.absoluteY;
      // if (heightAnimated.value < BEGIN_HEIGHT) heightAnimated.value = BEGIN_HEIGHT;
    })
    .onEnd((event) => {
      if (event.absoluteY < HEIGHT / 2) {
        scrollTo(HEIGHT - STATUSBAR_HEIGHT);
      } else if (event.absoluteY < HEIGHT - HEIGHT / 2) {
        scrollTo(BEGIN_HEIGHT);
      }
      //if (event.absoluteY < HEIGHT - BEGIN_HEIGHT + 100)
      else {
        scrollTo(BEGIN_HEIGHT);
      }
    });

  useEffect(() => {
    if (!bottomSheetFullScreen) scrollTo(BEGIN_HEIGHT);
  }, [bottomSheetFullScreen]);

  return (
    <GestureHandlerRootView>
      <Animated.View style={panAnimatedStyle}>
        <View
          flex
          bg-white
          style={{
            ...Shadows.md,
          }}
        >
          <GestureDetector gesture={pan}>
            <View centerH paddingT-s4 paddingB-s6>
              <View width={52} height={4} bg-gray100 br100 />
            </View>
          </GestureDetector>
          {children}
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

export default BottomPanel;
