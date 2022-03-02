import { BorderRadiuses, Constants } from "react-native-ui-lib";

export default BorderRadiuses.loadBorders({
  br4: Constants.isIOS ? 5 : 4,
  br8: Constants.isIOS ? 9 : 8,
  br16: 16,
  br32: 32,
  br100: 9999,
});
