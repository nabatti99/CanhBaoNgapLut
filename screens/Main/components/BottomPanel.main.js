import React from "react";
import { Dimensions } from "react-native";
import { BorderRadiuses, Colors, Shadows, Text, View } from "react-native-ui-lib";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const windowHeight = Dimensions.get("screen").height;

function BottomPanel({ children }) {
  // Setup Pan Gesture => height of Bottom Panel
  const BEGIN_HEIGHT = 218;
  const heightAnimated = useSharedValue(BEGIN_HEIGHT);

  const panAnimatedStyle = useAnimatedStyle(() => ({
    height: heightAnimated.value,
  }));

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      heightAnimated.value = windowHeight - event.absoluteY;
      if (heightAnimated.value < BEGIN_HEIGHT) heightAnimated.value = BEGIN_HEIGHT;
    })
    .onEnd((event) => {
      if (event.absoluteY < 100) heightAnimated.value = withTiming(windowHeight - 100, { duration: 240 });
    });

  return (
    <GestureHandlerRootView>
      <Animated.View style={panAnimatedStyle}>
        <View
          flex
          bg-white
          paddingH-s6
          style={{
            ...Shadows.md,
            borderTopLeftRadius: BorderRadiuses.br32,
            borderTopRightRadius: BorderRadiuses.br32,
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
