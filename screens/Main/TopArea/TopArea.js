import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { BorderRadiuses, Colors, Shadows, Text, View, Spacings } from 'react-native-ui-lib';
import { STATUSBAR_HEIGHT } from '../../../constants/constant';
import IconSvg from '../../../components/IconSVG';
import ItemPlace from '../components/ItemPlace';
import Animated, { SlideInDown, SlideInUp, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { setMarkerLocation, setShowSearchSheet, setShowTopArea } from '../store/mapStore';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

const TopArea = () => {
  const dispatch = useDispatch();
  const handleArrowBack = useCallback(() => {
    dispatch(setShowTopArea(false));
  }, []);

  const markerLocation = useSelector((state) => state.markerLocation);
  const showTopArea = useSelector((state) => state.showTopArea);

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });

  const handleClickItemPlace = useCallback((item) => {
    console.log('cc');
  }, []);

  const handleClickRemoveItemPlace = useCallback(
    (index) => {
      const newMarkerLocation = [...markerLocation];
      const data = newMarkerLocation.filter((_, i) => i !== index);
      dispatch(setMarkerLocation(data));
    },
    [markerLocation]
  );

  const handleClickAddMarker = useCallback(() => {
    handleArrowBack();
    dispatch(setShowSearchSheet(true));
  }, []);

  if (showTopArea) {
    return (
      <Animated.View style={styles.container} entering={SlideInDown.duration(300)} exiting={SlideInUp.duration(300)}>
        <StatusBar barStyle={'dark-content'} />
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          contentContainerStyle={styles.listView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={true}
        >
          {markerLocation.map((item, index) => {
            return (
              <ItemPlace
                key={index}
                translationY={translationY}
                index={index}
                item={item}
                onPress={() => handleClickItemPlace(item)}
                onPressRemove={() => handleClickRemoveItemPlace(index)}
              />
            );
          })}
          <TouchableOpacity onPress={handleClickAddMarker}>
            <View row marginL-s9 paddingB-s3 centerV>
              <IconSvg name={'ControlPointSVG'} width={28} height={28} color={Colors.blue500} />
              <Text marginL-s2 regular gray400>
                Thêm điểm đến
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.ScrollView>

        <View style={styles.iconArrow}>
          <IconSvg name={'ArrowLeftSVG'} width={28} height={28} onPress={handleArrowBack} />
        </View>
      </Animated.View>
    );
  } else {
    return <></>;
  }
};

export default TopArea;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: BorderRadiuses.br16,
    borderBottomRightRadius: BorderRadiuses.br16,
    paddingHorizontal: Spacings.s3,
    maxHeight: STATUSBAR_HEIGHT + Spacings.s3 + 300,
  },
  iconArrow: {
    position: 'absolute',
    left: Spacings.s3,
    top: STATUSBAR_HEIGHT + Spacings.s3,
  },
  listView: {
    paddingTop: STATUSBAR_HEIGHT + Spacings.s3,
  },
});
