import { FlatList, StyleSheet, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import TopInput from './TopInput.ui';
import { Colors, Incubator, Text, View, Spacings, BorderRadiuses } from 'react-native-ui-lib';
import ItemSearchPlace from '../ItemSearchPlace';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as PlaceApi from '../../../../apis/place.api';

import { useDispatch, useSelector } from 'react-redux';
import { setMarkerLocation } from '../../store/mapStore';
// const data = [1, 2, 312321, 32, 12, 3, 123, 12, 3, 12, 3];

const SearchBar = ({ txtSearch, handleTextChange, autoFocus = false }) => {
  const dispatch = useDispatch();
  const markerLocation = useSelector((state) => state.markerLocation);

  const [isfocus, setIsfocus] = useState(false);

  const typingTimeoutRef = useRef(null);

  const processValue = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: Colors.gray50,
      height: 'auto',
      maxHeight: interpolate(processValue.value, [0, 1], [0, 200], Extrapolate.CLAMP),
    };
  }, []);

  // useEffect(() => {
  //   if (txtSearch.length > 0 && data.length > 0 && isfocus) {
  //     processValue.value = withTiming(1);
  //   } else {
  //     processValue.value = withTiming(0);
  //   }
  // }, [txtSearch, data, isfocus]);

  // const handleClickItemResltSearch = (item) => {
  //   setTxtSearch(item.display_name);
  //   setIsfocus(false);
  //   const coordinate = {
  //     latitude: Number(item.lat),
  //     longitude: Number(item.lon),
  //   };
  //   console.log('cc', markerLocation);
  //   dispatch(setMarkerLocation([...markerLocation, ...[{ coordinate }]]));
  // };

  return (
    <View style={styles.container}>
      <TopInput
        value={txtSearch}
        onTextChange={handleTextChange}
        leftIconName={'SearchSVG'}
        placeholder={'Tìm kiếm địa điểm'}
        autoFocus={autoFocus}
      />

      {/* <Animated.View style={[styles.containerResult, heightStyle]}>
        <FlatList
          scrollEventThrottle={16}
          data={data}
          renderItem={({ item, index }) => {
            const isLast = index === data.length - 1;
            return (
              <TouchableOpacity onPress={() => handleClickItemResltSearch(item)}>
                <ItemSearchPlace item={item} isLast={isLast} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={true}
        />
      </Animated.View> */}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Spacings.s2,
    // borderRadius: BorderRadiuses.br8,
    // backgroundColor: Colors.gray50,
    overflow: 'hidden',
  },
  containerResult: {
    width: '100%',
    backgroundColor: Colors.gray50,
  },
});
