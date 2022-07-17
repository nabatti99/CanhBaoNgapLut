import { Dimensions, Platform, StatusBar } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

const STORAGE_KEY = {
  CURRENT_POSITION: 'current_position',
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export { WIDTH, HEIGHT, STORAGE_KEY, STATUSBAR_HEIGHT };
