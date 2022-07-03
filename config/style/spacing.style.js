import { StatusBar } from 'react-native';
import { Spacings } from 'react-native-ui-lib';

const height = StatusBar.currentHeight;

export default Spacings.loadSpacings({
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s7: 28,
  s8: 32,
  s9: 36,
  s10: 40,
  stb: height,
});
