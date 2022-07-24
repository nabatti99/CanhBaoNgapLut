import React, { useRef } from 'react';
import { View } from 'react-native-ui-lib';
import { Provider } from 'react-redux';

import mapStore from './store/mapStore';
import MapMain from './components/Map.main';
import BottomArea from './BottomArea/BottomArea.main';
import TopPart from './topParts/TopPart';
import SearchSheet from './SearchSheet/SearchSheet';
import TopArea from './TopArea/TopArea';

function MainScreen() {
  const refMap = useRef();
  return (
    <Provider store={mapStore}>
      <View flex backgroundColor="black">
        <MapMain ref={refMap} />
        {/* {style={{ zIndex: 1000, elevation: 100 }}} */}
        <TopPart refMap={refMap} />

        <View flex bottom absB absH>
          <BottomArea />
        </View>

        <SearchSheet />
        <TopArea />
      </View>
    </Provider>
  );
}

export default MainScreen;
