import React from 'react';
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
        {/* {style={{ zIndex: 1000, elevation: 100 }}} */}
        <View paddingH-24 paddingT-20 marginT-stb absT absH>
          <TopPart />
        </View>

        <View flex bottom absB absH>
          <BottomArea />
        </View>
      </View>
    </Provider>
  );
}

export default MainScreen;
