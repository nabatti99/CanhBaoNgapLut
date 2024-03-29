import { BackHandler, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBottomSheetFullScreen, setShowTopComponent } from '../store/mapStore';
import { TYPE_SHOW_TOP_COMPOENT } from '../../../constants/constant';

const HandleBack = ({ setIsShowCompoent, isShowCompoent }) => {
  const dispatch = useDispatch();
  const showTopPart = useSelector((state) => state.showTopPart);
  const bottomSheetFullScreen = useSelector((state) => state.bottomSheetFullScreen);

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (!isShowCompoent) {
      setIsShowCompoent(true);
      return true;
    }

    if (bottomSheetFullScreen) {
      dispatch(setBottomSheetFullScreen(false));
      return true;
    }

    if (!showTopPart) {
      dispatch(setShowTopComponent(TYPE_SHOW_TOP_COMPOENT.TOP_PART));
      return true;
    }

    BackHandler.exitApp();

    return false;
  });
  return <></>;
};

export default HandleBack;
