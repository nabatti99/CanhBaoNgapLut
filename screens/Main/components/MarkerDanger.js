import React from 'react';
import { Assets, Image, View } from 'react-native-ui-lib';

const MarkerDanger = ({ image, icon }) => {
  return (
    <View center>
      <Image source={Assets.marker.dangerGradient} style={{ width: 81, height: 81 }} resizeMode='contain' />
      <Image
        source={Assets.marker.danger}
        style={{ width: 14, height: 14, position: 'absolute' }}
        resizeMode='contain'
      />
    </View>
  );
};

export default MarkerDanger;
