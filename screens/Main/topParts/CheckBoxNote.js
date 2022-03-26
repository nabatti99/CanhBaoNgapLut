import React, { useState } from 'react';
import { Checkbox } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { setShownNote } from '../store/mapStore';

const CheckBoxNote = () => {
  const dispatch = useDispatch();
  const shownNote = useSelector((state) => state.shownNote);
  const handleCheckBox = () => {
    dispatch(setShownNote(!shownNote));
  };
  return (
    <Checkbox value={shownNote} onValueChange={handleCheckBox} borderRadius={5} size={16} style={{ marginLeft: 10 }} />
  );
};

export default CheckBoxNote;
