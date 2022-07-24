import { TYPE_SHOW_TOP_COMPOENT } from '../constants/constant';

const useShowTopCompoent = (state, type) => {
  console.log('type', type);
  if (type === TYPE_SHOW_TOP_COMPOENT.TOP_AREA) {
    console.log('TOP_AREA');
    state.showTopPart = false;
    state.showSearchSheet = false;
    state.showTopArea = true;
  } else if (type === TYPE_SHOW_TOP_COMPOENT.SEARCH_SHEET) {
    console.log('SEARCH_SHEET');
    state.showSearchSheet = true;
    state.showTopPart = false;
    state.showTopArea = false;
  } else {
    console.log('TOP_PART');
    state.showTopPart = true;
    state.showSearchSheet = false;
    state.showTopArea = false;
  }
};

export default useShowTopCompoent;
