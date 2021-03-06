import { Platform, StatusBar, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { BorderRadiuses, Colors, Shadows, Text, View, Spacings } from 'react-native-ui-lib';
import ListView from '../../../components/ListView';
import ItemSearchPlace from '../components/ItemSearchPlace';
import { HEIGHT, STATUSBAR_HEIGHT, STORAGE_KEY, TYPE_SHOW_TOP_COMPOENT, WIDTH } from '../../../constants/constant';
import SearchBar from '../components/UI/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import IconSvg from '../../../components/IconSVG';
import { useEffect } from 'react';
import Animated, {
  FadeOutDown,
  FadeOutUp,
  interpolate,
  SlideInUp,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useCallback } from 'react';
import { useState } from 'react';
import { setMarkerLocation, setShowSearchSheet, setShowTopArea, setShowTopComponent } from '../store/mapStore';
import * as PlaceApi from '../../../apis/place.api';
import * as directionApi from '../../../apis/direction.api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchSheet = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [txtSearch, setTxtSearch] = useState('');
  const typingTimeoutRef = useRef(null);

  const showSearchSheet = useSelector((state) => state.showSearchSheet);
  const markerLocation = useSelector((state) => state.markerLocation);

  const contentValue = useSharedValue(HEIGHT);

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withDelay(200, withTiming(contentValue.value, { duration: 600 })),
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
        return {
          display_name: res.display_name,
          latitude: Number(res.lat),
          longitude: Number(res.lon),
        };
      });

      const res = await Promise.all(getInfoDirection);
      const result = res.map((e, index) => {
        return {
          display_name: resultPlaceName[index].display_name,
          latitude: Number(resultPlaceName[index].latitude),
          longitude: Number(resultPlaceName[index].longitude),
          duration: e.routes[0].duration,
          distance: e.routes[0].distance,
        };
      });

      setData(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTextChange = useCallback(
    (newValue) => {
      setTxtSearch(newValue);

      if (newValue.length > 0) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          fetchData(newValue);
        }, 500);
      }
    },
    [typingTimeoutRef]
  );

  useEffect(() => {
    if (showSearchSheet) {
      contentValue.value = 0;
    }
  }, [showSearchSheet]);

  const handleArrowBack = useCallback(() => {
    dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.TOP_PART));
    contentValue.value = HEIGHT;
  }, []);

  const handleClickItemSearch = useCallback(
    (item) => {
      setTxtSearch(item.display_name);
      const marker = {
        name: item.display_name,
        coordinate: {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        },
      };

      dispatch(setMarkerLocation([...markerLocation, ...[marker]]));
      contentValue.value = HEIGHT;
      dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.TOP_AREA));
      // dispatch(setShowTopArea(true));
    },
    [markerLocation]
  );
  if (showSearchSheet) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        {/* Top */}
        <Animated.View entering={SlideInUp.duration(600)} exiting={SlideOutUp.duration(300)}>
          <View style={styles.topContainer} row centerV>
            <View marginR-s2>
              <IconSvg name={'ArrowLeftSVG'} width={28} height={28} onPress={handleArrowBack} />
            </View>
            <SearchBar handleTextChange={handleTextChange} txtSearch={txtSearch} autoFocus={true} />
          </View>
          <View></View>
        </Animated.View>

        {/* Content */}
        <Animated.View style={[styles.contentContainer, contentStyle]}>
          {data.length > 0 ? (
            <ListView
              data={data}
              renderItem={({ item }) => <ItemSearchPlace item={item} onPress={() => handleClickItemSearch(item)} />}
            />
          ) : (
            <Text gray500 marginT-s5>
              Kh??ng c?? k???t qu???
            </Text>
          )}
        </Animated.View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default SearchSheet;

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
