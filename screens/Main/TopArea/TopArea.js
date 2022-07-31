import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { BorderRadiuses, Colors, Shadows, Text, View, Spacings } from 'react-native-ui-lib';
import { STATUSBAR_HEIGHT, TYPE_SHOW_TOP_COMPOENT } from '../../../constants/constant';
import IconSvg from '../../../components/IconSVG';
import ItemPlace from '../components/ItemPlace';
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutUp,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { setMarkerLocation, setShowSearchSheet, setShowTopArea, setShowTopComponent } from '../store/mapStore';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TopArea = () => {
  const dispatch = useDispatch();
  const handleArrowBack = useCallback(() => {
    // dispatch(setShowTopArea(false));
    dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.TOP_PART));
  }, []);

  const flatListRef = useRef();

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
    // handleArrowBack();
    // dispatch(setShowSearchSheet(true));
    dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.SEARCH_SHEET));
  }, []);

  const renderItem = ({ item, drag, isActive, index }) => {
    return (
      <ScaleDecorator>
        <ItemPlace
          key={index}
          translationY={translationY}
          index={index}
          item={item}
          onPress={() => handleClickItemPlace(item)}
          onPressRemove={() => handleClickRemoveItemPlace(index)}
          onPressDrag={drag}
        />
      </ScaleDecorator>
    );
  };

  if (showTopArea) {
    return (
      <Animated.View style={styles.container} entering={SlideInUp.duration(1000)} exiting={SlideOutUp.duration(1000)}>
        <StatusBar barStyle={'dark-content'} />
        <GestureHandlerRootView>
          <DraggableFlatList
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollToOverflowEnabled={true}
            onScroll={scrollHandler}
            data={markerLocation}
            onDragEnd={({ data }) => dispatch(setMarkerLocation(data))}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            scrollEventThrottle={16}
            contentContainerStyle={styles.listView}
            onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity onPress={handleClickAddMarker}>
                  <View row marginL-s9 paddingB-s3 centerV>
                    <IconSvg name={'ControlPointSVG'} width={28} height={28} color={Colors.blue500} />
                    <Text marginL-s2 regular gray400>
                      Thêm điểm đến
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </GestureHandlerRootView>

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
    maxHeight: STATUSBAR_HEIGHT + Spacings.s3 + 180,
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
