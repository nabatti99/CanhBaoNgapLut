import React from 'react';
import { View } from 'react-native-ui-lib';
import MyLocation from './MyLocation';
import NoteMenu from './NoteMenu';
import RainMenu from './RainMenu';
import Report from './Report';
import SearchBar from './SearchBar';

const TopPart = () => {
  return (
    <View row spread>
      <View flex paddingR-s2>
        <NoteMenu />
        <SearchBar />
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
