import { Dimensions, Platform, StatusBar } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

const STORAGE_KEY = {
  CURRENT_POSITION: 'current_position',
  SEARCH_HIS: 'search_his',
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const TYPE_SHOW_TOP_COMPOENT = {
  TOP_AREA: 1,
  SEARCH_SHEET: 2,
  TOP_PART: 3,
};

export { WIDTH, HEIGHT, STORAGE_KEY, STATUSBAR_HEIGHT, TYPE_SHOW_TOP_COMPOENT };
