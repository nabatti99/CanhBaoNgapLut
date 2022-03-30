import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleTopInputChanged } from '../store/mapStore';
import BottomPanel from '../components/BottomPanel.main';
import TopInput from '../components/UI/TopInput.ui';
import DirectionInstruction from './DirectionInstruction.bottom';
import SearchLocation from './SearchLocation.bottom';
import StartAddress from './StartAddress';

function BottomArea() {
  const dispatch = useDispatch();

  const value = useSelector((state) => state.topInput.value);
  const leftIconName = useSelector((state) => state.topInput.leftIconName);
  const placeholder = useSelector((state) => state.topInput.placeholder);
  const label = useSelector((state) => state.topInput.label);

  return (
    <BottomPanel>
      <TopInput
        value={value}
        onTextChange={(newValue) => dispatch(handleTopInputChanged(newValue))}
        leftIconName={leftIconName}
        placeholder={placeholder}
        label={label}
      />
      {/* <SearchLocation /> */}
      <StartAddress />
      {/* <DirectionInstruction /> */}
    </BottomPanel>
  );
}

export default BottomArea;
