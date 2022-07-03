import { FlatList, StyleSheet, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import TopInput from '../components/UI/TopInput.ui';
import { Colors, Incubator, Text, View, Spacings, BorderRadiuses } from 'react-native-ui-lib';
import ItemSearchPlace from '../components/ItemSearchPlace';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as PlaceApi from '../../../apis/place.api';

import { useDispatch, useSelector } from 'react-redux';
import { setMarkerLocation } from '../store/mapStore';
// const data = [1, 2, 312321, 32, 12, 3, 123, 12, 3, 12, 3];

const SearchBar = () => {
  const dispatch = useDispatch();
  const markerLocation = useSelector((state) => state.markerLocation);

  const [txtSearch, setTxtSearch] = useState('');
  const [data, setData] = useState(['Không có kết quả']);
  const [isfocus, setIsfocus] = useState(false);

  const typingTimeoutRef = useRef(null);

  const processValue = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: Colors.gray50,
      height: 'auto',
      borderTopColor: Colors.blue500,
      borderTopWidth: interpolate(processValue.value, [0, 1], [0, 0.5], Extrapolate.CLAMP),
      maxHeight: interpolate(processValue.value, [0, 1], [0, 200], Extrapolate.CLAMP),
    };
  }, []);

  const fetchData = async (newValue) => {
    try {
      console.log('newValue', newValue);
      const response = await PlaceApi.search(newValue);
      const result = response?.map((res) => {
        return {
          display_name: res.display_name,
          lat: res.lat,
          lon: res.lon,
        };
      });

      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (txtSearch.length > 0 && data.length > 0 && isfocus) {
      processValue.value = withTiming(1);
    } else {
      processValue.value = withTiming(0);
    }
  }, [txtSearch, data, isfocus]);

  const handleTextChange = useCallback((newValue) => {
    setTxtSearch(newValue);

    if (newValue.length > 0) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        fetchData(newValue);
      }, 500);
    }
  }, []);

  const handleClickItemResltSearch = (item) => {
    setTxtSearch(item.display_name);
    setIsfocus(false);
    const coordinate = {
      latitude: Number(item.lat),
      longitude: Number(item.lon),
    };
    console.log('cc', markerLocation);
    dispatch(setMarkerLocation([...markerLocation, ...[{ coordinate }]]));
  };

  return (
    <View style={styles.container}>
      <TopInput
        onFocus={() => setIsfocus(true)}
        // onBlur={() => setIsfocus(false)}
        value={txtSearch}
        onTextChange={handleTextChange}
        leftIconName={'SearchSVG'}
        placeholder={'Tìm kiếm địa điểm'}
      />

      <Animated.View style={[styles.containerResult, heightStyle]}>
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
      </Animated.View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    marginBottom: Spacings.s2,
    borderRadius: BorderRadiuses.br8,
    backgroundColor: Colors.gray50,
    overflow: 'hidden',
  },
  containerResult: {
    width: '100%',
    backgroundColor: Colors.gray50,
  },
});
