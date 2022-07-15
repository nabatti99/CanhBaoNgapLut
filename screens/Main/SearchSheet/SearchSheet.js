import { Platform, StatusBar, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { BorderRadiuses, Colors, Shadows, Text, View, Spacings } from 'react-native-ui-lib';
import ListView from '../../../components/ListView';
import ItemSearchPlace from '../components/ItemSearchPlace';
import { HEIGHT, STORAGE_KEY, WIDTH } from '../../../constants/constant';
import SearchBar from '../components/UI/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import IconSvg from '../../../components/IconSVG';
import { useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useCallback } from 'react';
import { useState } from 'react';
import { setShowSearchSheet } from '../store/mapStore';
import * as PlaceApi from '../../../apis/place.api';
import * as directionApi from '../../../apis/direction.api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const SearchSheet = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [txtSearch, setTxtSearch] = useState('');
  const typingTimeoutRef = useRef(null);

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

  const fetchData = useCallback(async (newValue) => {
    try {
      const currentPosition = await AsyncStorage.getItem(STORAGE_KEY.CURRENT_POSITION);
      const dataCurrentPostion = JSON.parse(currentPosition);
      const response = await PlaceApi.search(newValue);
      const getInfoDirection = [];
      const resultPlaceName = response?.map((res) => {
        getInfoDirection.push(
          directionApi.infoDirection([dataCurrentPostion, { longitude: res.lon, latitude: res.lat }])
        );
        return res.display_name;
      });

      const res = await Promise.all(getInfoDirection);
      const result = res.map((e, index) => {
        return {
          display_name: resultPlaceName[index],
          duration: e.routes[0].duration,
          distance: e.routes[0].distance,
        };
      });

      console.log(result);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          <SearchBar handleTextChange={handleTextChange} txtSearch={txtSearch} />
        </View>
        {/* Content */}
        <Animated.View style={[styles.contentContainer, contentStyle]}>
          {data.length > 0 ? (
            <ListView data={data} renderItem={({ item }) => <ItemSearchPlace item={item} />} />
          ) : (
            <Text gray500 marginT-s5>
              Không có kết quả
            </Text>
          )}
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
    elevation: 2,
  },
  contentContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacings.s3,
    height: '100%',
    alignItems: 'center',
  },
});
