import React, { useEffect } from "react";
import { Colors, Text, View } from "react-native-ui-lib";
import { useDispatch } from "react-redux";
import TopInput from "../components/UI/TopInput.ui";

import { setPolyline, setMarker, setTopInput } from "../store/mapStore";

function DirectionInstruction() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPolyline({
        strokeColor: Colors.blue300,
        strokeWidth: 4,
        points: [
          { latitude: 15.3, longitude: 108.8 },
          { latitude: 15.2, longitude: 108.9 },
          { latitude: 15.1, longitude: 108.85 },
          { latitude: 15.05, longitude: 108.75 },
        ],
      })
    );

    dispatch(
      setMarker({
        image: null,
        points: [
          { latitude: 15.3, longitude: 108.8 },
          { latitude: 15.05, longitude: 108.75 },
        ],
      })
    );

    dispatch(
      setTopInput({
        label: "Vị trí bắt đầu",
        value: "Bưu điện Thành Phố Tam Kỳ",
        leftIconComponent: "send.svg",
        placeholder: "",
      })
    );
  }, []);

  return <View></View>;
}

export default DirectionInstruction;
