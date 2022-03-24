import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Colors } from "react-native-ui-lib";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    polyline: {
      strokeColor: Colors.blue300,
      strokeWidth: 4,
      points: [],
    },

    marker: {
      image: null,
      points: [],
    },

    topInput: {
      label: "",
      value: "",
      leftIconComponent: "send.svg",
      placeholder: "",
    },
  },
  reducers: {
    setPolyline: (state, action) => {
      state.polyline = {
        ...state.polyline,
        ...action.payload,
      };
    },
    setMarker: (state, action) => {
      state.marker = {
        ...state.marker,
        ...action.payload,
      };
    },
    setTopInput: (state, action) => {
      state.topInput = {
        ...state.topInput,
        ...action.payload,
      };
    },
    handleTopInputChanged: (state, action) => {
      state.topInput.value = action.payload;
    },
  },
});

const mapStore = configureStore({
  reducer: mapSlice.reducer,
});

export default mapStore;

export const { setPolyline, setMarker, setTopInput, handleTopInputChanged } = mapSlice.actions;
