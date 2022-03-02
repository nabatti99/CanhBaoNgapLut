import * as Font from "expo-font";

export default async function loadFonts() {
  await Font.loadAsync({
    LatoRegular: require("../assets/fonts/Lato/Lato-Regular.ttf"),
    LatoBlack: require("../assets/fonts/Lato/Lato-Black.ttf"),
    LatoBold: require("../assets/fonts/Lato/Lato-Bold.ttf"),
    LatoHeavy: require("../assets/fonts/Lato/Lato-Heavy.ttf"),

    BeVNProLight: require("../assets/fonts/BeVietnamPro/BeVietnamPro-Light.ttf"),
    BeVNProRegular: require("../assets/fonts/BeVietnamPro/BeVietnamPro-Regular.ttf"),
    BeVNProMedium: require("../assets/fonts/BeVietnamPro/BeVietnamPro-Medium.ttf"),
    BeVNProSemiBold: require("../assets/fonts/BeVietnamPro/BeVietnamPro-SemiBold.ttf"),
    BeVNProBold: require("../assets/fonts/BeVietnamPro/BeVietnamPro-Bold.ttf"),
    BeVNProExtraBold: require("../assets/fonts/BeVietnamPro/BeVietnamPro-ExtraBold.ttf"),
  });

  return true;
}
