import { Assets } from "react-native-ui-lib";

const BASE_ASSETS_PATH = "../assets/pictures/";

export default function loadAssets() {
  Assets.loadAssetsGroup("logo", {
    bk: require(BASE_ASSETS_PATH + "logo_bk.jpg"),
  });

  Assets.loadAssetsGroup("splash", {
    smartCity: require(BASE_ASSETS_PATH + "smart_city.jpg"),
    phone: require(BASE_ASSETS_PATH + "phone_in_hand.jpg"),
    water: require(BASE_ASSETS_PATH + "water_in_foot.jpg"),
  });
}
