import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Colors } from 'react-native-ui-lib';
import useShowTopCompoent from '../../../utils/showTopComponet';
import { uniqueArray } from '../../../utils/utils';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    polylines: [
      [
        {
          strokeColor: Colors.blue300,
          strokeWidth: 4,
          points: [],
          routes: [],
        },
      ],
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
    markerLocation: [
      // {
      //   currentPosition: true,
      //   name: ''
      //   coordinate: {}
      // }
    ],
    directionInfors: [],

    shownNote: true,

    topInput: {
      label: '',
      value: '',
      leftIconName: 'SendSVG',
      placeholder: '',
    },

    floodingSituation: {
      // name: '',
      // description: '',
      // level: '', 0 | 1 | 2
    },

    txtSearchPlace: '',

    showSearchSheet: false,
    showTopArea: false,
    showTopPart: true,
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
      const array = uniqueArray([...action.payload]);
      state.markerLocation = array;
    },
    setDirectionInfors: (state, action) => {
      state.directionInfors = [...action.payload];
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
    setShowSearchSheet: (state, action) => {
      state.showSearchSheet = action.payload;
    },
    setShowTopArea: (state, action) => {
      state.showTopArea = action.payload;
    },
    setShowTopComponent: (state, action) => {
      useShowTopCompoent(state, action.payload);
    },
    setTxtSearchPlace: (state, action) => {
      state.txtSearchPlace = action.payload;
    },
    setFloodingSituation: (state, action) => {
      state.floodingSituation = action.payload;
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
  setShowSearchSheet,
  setShowTopArea,
  setShowTopComponent,
  setTxtSearchPlace,
  setFloodingSituation,
} = mapSlice.actions;
