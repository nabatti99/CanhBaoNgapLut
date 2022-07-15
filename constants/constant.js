import { Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

const STORAGE_KEY = {
  CURRENT_POSITION: 'current_position',
};

export { WIDTH, HEIGHT, STORAGE_KEY };
