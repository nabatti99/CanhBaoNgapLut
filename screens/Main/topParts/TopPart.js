import React from 'react';
import { View } from 'react-native-ui-lib';
import MyLocation from './MyLocation';
import NoteMenu from './NoteMenu';
import RainMenu from './RainMenu';
import Report from './Report';

const TopPart = () => {
  return (
    <View row spread>
      <View>
        <NoteMenu />
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
