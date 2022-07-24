import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React from 'react';
import { Colors, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';
import { STORAGE_KEY } from '../../../constants/constant';

const MyLocation = ({ refMap }) => {
  const handleClick = async () => {
    try {
      const curentLocation = await useAsyncStorage(STORAGE_KEY.CURRENT_POSITION).getItem();
      console.log(curentLocation);
      refMap.current.setCamera(
        {
          center: JSON.parse(curentLocation),
          zoom: 16,
        },
        1000
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View backgroundColor={Colors.white} padding-4 br4 md>
      <IconSvg name={'CurrentLocationSVG'} width={24} height={24} color={Colors.blue400} onPress={handleClick} />
    </View>
  );
};

export default MyLocation;
