import React, { useEffect } from 'react';
import { Spacings, Text, View } from 'react-native-ui-lib';
import MyLocation from './MyLocation';
import NoteMenu from './NoteMenu';
import RainMenu from './RainMenu';
import Report from './Report';
import SearchBar from '../components/UI/SearchBar';
import { Pressable, StatusBar, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setShowSearchSheet, setShowTopComponent } from '../store/mapStore';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  FadeOutDown,
  runOnJS,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { STATUSBAR_HEIGHT, TYPE_SHOW_TOP_COMPOENT } from '../../../constants/constant';

const TopPart = ({ refMap }) => {
  const dispatch = useDispatch();
  const showTopPart = useSelector((state) => state.showTopPart);
  const handleClickSearchBar = useCallback(() => {
    translateY.value = withTiming(-STATUSBAR_HEIGHT - 200, { duration: 300, easing: Easing.linear }, (finish) => {
      if (finish) runOnJS(handleDispatch)();
    });
  }, []);

  const handleDispatch = () => {
    // setTimeout(() => {

    // }, 300);
    dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.SEARCH_SHEET));
  };

  const translateY = useSharedValue(-STATUSBAR_HEIGHT - 200);
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(translateY.value, { duration: 300, easing: Easing.linear }) }],
    };
  }, []);

  useEffect(() => {
    if (showTopPart) translateY.value = withTiming(0, { duration: 300, easing: Easing.linear });
  }, [showTopPart]);

  if (showTopPart) {
    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <StatusBar barStyle={'dark-content'} />
        <View row spread>
          <View flex paddingR-s2>
            <View width={'100%'} height={48}>
              <SearchBar />
              <Pressable style={styles.searchBarView} onPress={handleClickSearchBar}>
                <View width={'100%'} height={'100%'} />
              </Pressable>
            </View>
            <NoteMenu />
          </View>
          <View right>
            <RainMenu />
            <View row centerV marginT-8>
              <View marginR-8>
                <MyLocation refMap={refMap} />
              </View>
              <Report />
            </View>
          </View>
        </View>
      </Animated.View>
    );
  } else {
    return <></>;
  }
};

export default React.memo(TopPart);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.s4,
    paddingTop: STATUSBAR_HEIGHT + Spacings.s2,
  },
  searchBarView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
