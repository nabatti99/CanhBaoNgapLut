import { Colors, Shadows } from "react-native-ui-lib";

export default Shadows.loadShadows({
  sm: {
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  base: {
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  md: {
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 8,
  },
});
