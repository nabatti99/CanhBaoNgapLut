import { Platform, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { BorderRadiuses, Colors, Shadows, Text, View, Spacings } from 'react-native-ui-lib';
import ListView from '../../../components/ListView';
import ItemSearchPlace from '../components/ItemSearchPlace';
import { HEIGHT, WIDTH } from '../../../constants/constant';
import SearchBar from '../components/UI/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import IconSvg from '../../../components/IconSVG';
import { useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useCallback } from 'react';
import { useState } from 'react';
import { setShowSearchSheet } from '../store/mapStore';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SearchSheet = () => {
  const dispatch = useDispatch();
  const showSearchSheet = useSelector((state) => state.showSearchSheet);

  const contentValue = useSharedValue(HEIGHT);

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(contentValue.value),
        },
      ],
      elevation: interpolate(contentValue.value, [0, HEIGHT], [1, -1]),
      zIndex: interpolate(contentValue.value, [0, HEIGHT], [1, -1]),
    };
  }, []);

  useEffect(() => {
    if (showSearchSheet) {
      contentValue.value = 0;
    }
  }, [showSearchSheet]);

  const handleArrowBack = useCallback(() => {
    dispatch(setShowSearchSheet(false));
    contentValue.value = HEIGHT;
  }, []);

  if (showSearchSheet) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        {/* Top */}
        <View style={styles.topContainer} row centerV>
          <View marginR-s2>
            <IconSvg name={'ArrowLeftSVG'} width={28} height={28} onPress={handleArrowBack} />
          </View>
          <SearchBar />
        </View>
        {/* Content */}
        <Animated.View style={[styles.contentContainer, contentStyle]}>
          <ListView data={data} renderItem={({ item }) => <ItemSearchPlace item={item} />} />
        </Animated.View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default React.memo(SearchSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT,
  },
  topContainer: {
    paddingTop: STATUSBAR_HEIGHT + Spacings.s3,
    paddingHorizontal: Spacings.s3,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacings.s3,
    height: '100%',
  },
});
