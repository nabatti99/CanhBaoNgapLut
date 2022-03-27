import React from 'react';
import { Colors, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';

const MyLocation = () => {
  return (
    <View backgroundColor={Colors.white} padding-4 br4 md>
      <IconSvg name={'CoffeeSVG'} width={24} height={24} color={Colors.blue400} />
    </View>
  );
};

export default MyLocation;
