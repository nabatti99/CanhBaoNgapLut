import React from 'react';
import { View } from 'react-native-ui-lib';
import MyLocation from './MyLocation';
import NoteMenu from './NoteMenu';
import RainMenu from './RainMenu';
import Report from './Report';
import SearchBar from '../components/UI/SearchBar';
import { Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setShowSearchSheet } from '../store/mapStore';

const TopPart = () => {
  const dispatch = useDispatch();

  const handleClickSearchBar = useCallback(() => {
    console.log('adadad');
    dispatch(setShowSearchSheet(true));
  }, []);

  return (
    <View row spread>
      <View flex paddingR-s2>
        <NoteMenu />
        <View absT width={'100%'}>
          <SearchBar />
          <Pressable style={styles.searchBarView} onPress={handleClickSearchBar}>
            <View width={'100%'} height={'90%'} />
          </Pressable>
        </View>
      </View>
      <View right>
        <View>
          <RainMenu />
        </View>
        <View row centerV marginT-8>
          <View marginR-8>
            <MyLocation />
          </View>
          <View>
            <Report />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopPart;

const styles = StyleSheet.create({
  searchBarView: {
    width: '100%',
    height: '90%',
    position: 'absolute',
  },
});
