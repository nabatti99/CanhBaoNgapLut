import { Platform, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
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
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { uniqueArray } from '../../../utils/utils';

const SearchSheet = () => {
  const dispatch = useDispatch();

  const [searchHis, setSearchHis] = useState([]);
  const [data, setData] = useState([]);
  const [txtSearch, setTxtSearch] = useState('');
  const typingTimeoutRef = useRef(null);

  const showSearchSheet = useSelector((state) => state.showSearchSheet);
  const markerLocation = useSelector((state) => state.markerLocation);
  const txtSearchPlace = useSelector((state) => state.txtSearchPlace);

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

  useEffect(() => {
    if (txtSearchPlace) setTxtSearch(txtSearchPlace);
  }, [txtSearchPlace]);

  const fetchData = useCallback(async (newValue) => {
    try {
      const currentPosition = await AsyncStorage.getItem(STORAGE_KEY.CURRENT_POSITION);
      const dataCurrentPostion = JSON.parse(currentPosition).coordinate;
      const response = await PlaceApi.search(newValue);
      const getInfoDirection = [];
      const resultPlaceName = response?.map((res) => {
        getInfoDirection.push(directionApi.infoDirectionSearch([dataCurrentPostion, { longitude: res.lon, latitude: res.lat }]));
        return {
          display_name: res.display_name,
          latitude: Number(res.lat),
          longitude: Number(res.lon),
          duration: 3000,
          distance: 10000,
        };
      });

      // const res = await Promise.all(getInfoDirection);
      // const result = res.map((e, index) => {
      //   return {
      //     display_name: resultPlaceName[index].display_name,
      //     latitude: Number(resultPlaceName[index].latitude),
      //     longitude: Number(resultPlaceName[index].longitude),
      //     duration: e.routes[0].duration,
      //     distance: e.routes[0].distance,
      //   };
      // });

      setData(resultPlaceName);
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

  const fetchDataSearchHis = useCallback(async () => {
    try {
      const data = await useAsyncStorage(STORAGE_KEY.SEARCH_HIS).getItem();
      console.log(JSON.parse(data));
      if (Array.isArray(JSON.parse(data))) setSearchHis(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (showSearchSheet) {
      contentValue.value = 0;
      fetchDataSearchHis();
    }
  }, [showSearchSheet, fetchDataSearchHis]);

  const handleArrowBack = useCallback(() => {
    dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.TOP_PART));
    contentValue.value = HEIGHT;
  }, []);

  const handleClickItemSearch = useCallback(
    async (item) => {
      const marker = {
        name: item.display_name,
        coordinate: {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        },
      };
      AsyncStorage.getItem(STORAGE_KEY.SEARCH_HIS, (err, result) => {
        let list = [];
        if (err) return;
        if (result) list = JSON.parse(result);
        list.push(item);
        const uniqueList = uniqueArray(list);
        AsyncStorage.setItem(STORAGE_KEY.SEARCH_HIS, JSON.stringify(uniqueList));
        // AsyncStorage.removeItem(STORAGE_KEY.SEARCH_HIS);
      });

      setData([]);
      setTxtSearch('');

      dispatch(setMarkerLocation([...markerLocation, ...[marker]]));
      contentValue.value = HEIGHT;
      dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.TOP_AREA));

      // dispatch(setShowTopArea(true));
    },
    [markerLocation]
  );

  const handleRemoveSearchHis = useCallback(
    (index) => {
      const n = [...searchHis];
      const newSearchHis = n.filter((_, i) => i !== index);
      setSearchHis(newSearchHis);
      AsyncStorage.setItem(STORAGE_KEY.SEARCH_HIS, JSON.stringify(newSearchHis)).catch((err) => console.log(err));
    },
    [searchHis]
  );

  const handleClickCurrentLocation = useCallback(async () => {
    const location = await AsyncStorage.getItem(STORAGE_KEY.CURRENT_POSITION);
    setData([]);
    setTxtSearch('');
    dispatch(setMarkerLocation([...markerLocation, ...[JSON.parse(location)]]));
    contentValue.value = HEIGHT;
    dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.TOP_AREA));
  }, []);

  if (showSearchSheet) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        {/* Top */}
        <Animated.View entering={SlideInUp.duration(600)} exiting={SlideOutUp.duration(300)} style={styles.topContainer}>
          <View row centerV>
            <View marginR-s2>
              <IconSvg name={'ArrowLeftSVG'} width={28} height={28} onPress={handleArrowBack} />
            </View>
            <SearchBar handleTextChange={handleTextChange} txtSearch={txtSearch} autoFocus={true} />
          </View>
          {txtSearch.length === 0 ? (
            <TouchableOpacity onPress={handleClickCurrentLocation}>
              <View row centerV paddingV-s2>
                <IconSvg name={'CurrentLocationSVG'} width={28} height={28} color={Colors.blue500} />
                <Text marginL-s2 strong gray500>
                  Vị trí hiện tại
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </Animated.View>

        {/* Content */}
        <Animated.View style={[styles.contentContainer, contentStyle]}>
          {txtSearch && data.length > 0 ? (
            <ListView data={data} renderItem={({ item }) => <ItemSearchPlace item={item} onPress={() => handleClickItemSearch(item)} />} />
          ) : searchHis.length > 0 ? (
            <ListView
              data={searchHis}
              renderItem={({ item, index }) => {
                return (
                  <ItemSearchPlace
                    isHis={true}
                    item={item}
                    onPress={() => handleClickItemSearch(item)}
                    removeSearchHis={() => handleRemoveSearchHis(index)}
                  />
                );
              }}
            />
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
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
