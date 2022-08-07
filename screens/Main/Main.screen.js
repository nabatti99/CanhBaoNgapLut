import React, { useRef } from 'react';
import { View } from 'react-native-ui-lib';
import { Provider } from 'react-redux';

import mapStore from './store/mapStore';
import MapMain from './components/Map.main';
import BottomArea from './BottomArea/BottomArea.main';
import TopPart from './topParts/TopPart';
import SearchSheet from './SearchSheet/SearchSheet';
import TopArea from './TopArea/TopArea';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useState } from 'react';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import HandleBack from './components/HandleBack';
import { useEffect } from 'react';

function MainScreen() {
  const refMap = useRef();
  const [isShowCompoent, setIsShowCompoent] = useState(true);
  const [layoutTop, setLayoutTop] = useState(0);

  const heightValue = useSharedValue(0);
  const topStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: heightValue.value }],
    };
  }, [layoutTop]);

  const clickMap = useCallback(() => {
    setIsShowCompoent(!isShowCompoent);
  }, [layoutTop, isShowCompoent]);

  useEffect(() => {
    heightValue.value = withTiming(isShowCompoent ? 0 : -layoutTop);
  }, [isShowCompoent]);

  return (
    <Provider store={mapStore}>
      <View flex backgroundColor="black">
        <HandleBack isShowCompoent={isShowCompoent} setIsShowCompoent={setIsShowCompoent} />
        <MapMain ref={refMap} clickMap={clickMap} />
        {/* {style={{ zIndex: 1000, elevation: 100 }}} */}
        <Animated.View
          style={topStyle}
          onLayout={(e) => {
            setLayoutTop(e.nativeEvent.layout.height);
          }}
        >
          <TopPart refMap={refMap} />

          <TopArea />
        </Animated.View>
        <SearchSheet />

        <View flex bottom absB absH>
          <BottomArea isShowCompoent={isShowCompoent} />
        </View>
      </View>
    </Provider>
  );
}

export default MainScreen;
