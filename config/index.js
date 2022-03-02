import loadAssets from "./loadAssets";
import loadFonts from "./loadFonts";
import "./style";

async function loadConfig() {
  await loadFonts();
  loadAssets();
}

export default loadConfig;
