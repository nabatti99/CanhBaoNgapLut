import React from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Provider } from 'react-redux';

import mapStore from './store/mapStore';
import MapMain from './components/Map.main';
import BottomArea from './BottomArea/BottomArea.main';
import TopPart from './topParts/TopPart';

function MainScreen() {
  return (
    <Provider store={mapStore}>
      <View flex>
        <MapMain />
        <View top paddingH-24 paddingT-20>
          <TopPart />
        </View>
        <View flex bottom>
          <BottomArea />
        </View>
      </View>
    </Provider>
  );
}

export default MainScreen;
