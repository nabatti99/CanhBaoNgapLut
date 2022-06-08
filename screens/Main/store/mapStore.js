import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Colors } from 'react-native-ui-lib';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    polylines: [
      {
        strokeColor: Colors.blue300,
        strokeWidth: 4,
        points: [],
      },
    ],

    markerDanger: {
      image: null,
      icon: null,
      points: [
        {
          latitude: 16.020382,
          longitude: 108.21141,
          name: 'hahahahah',
          abc: 'sadlknaskld',
        },
        {
          latitude: 16.01286,
          longitude: 107.74866,
          name: 'alskdjlasdkl',
          abc: 'sadlknaskld',
        },
        {
          latitude: 15.82931,
          longitude: 108.05491,
          name: 'alskdjlasdkl',
          abc: 'sadlknaskld',
        },
      ],
    },
    // direction
    markerLocation: [],
    directionInfors: {
      weight: '',
      duration: '',
      distance: '',
      routes: [],
    },

    shownNote: true,

    topInput: {
      label: '',
      value: '',
      leftIconName: 'SendSVG',
      placeholder: '',
    },
  },
  reducers: {
    setPolylines: (state, action) => {
      state.polylines = [...action.payload];
    },
    setMarkerDanger: (state, action) => {
      state.markerDanger = {
        ...state.markerDanger,
        ...action.payload,
      };
    },

    setMarkerLocation: (state, action) => {
      state.markerLocation = [...action.payload];
    },
    setDirectionInfors: (state, action) => {
      state.directionInfors = { ...action.payload };
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
    setShownNote: (state, action) => {
      state.shownNote = action.payload;
    },
  },
});

const mapStore = configureStore({
  reducer: mapSlice.reducer,
});

export default mapStore;

export const {
  setPolylines,
  setMarkerDanger,
  setDirectionInfors,
  setMarkerLocation,
  setTopInput,
  setShownNote,
  handleTopInputChanged,
} = mapSlice.actions;
