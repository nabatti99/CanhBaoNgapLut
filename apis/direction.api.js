import axios from 'axios';
import { DRIVING } from '../constants/constant';

const direction = async (locations, query = '') => {
  const stringLocations = locations
    .map((location) => `${location.coordinate.longitude},${location.coordinate.latitude}`)
    .join(';');
  const url = `http://routing.openstreetmap.de/routed-bike/route/v1/driving/${stringLocations}?${query}overview=false&steps=true&alternatives=true`;
  // const url = `https://routing.openstreetmap.de/routed-bike/route/v1/driving/108.212,16.068;107.9736637361818,16.0666484?overview=false&steps=true&alternatives=true`;
  console.log(url);
  const result = await axios.get(url);
  return result.data;
};

const infoDirection = async (locations, driving = DRIVING.BIKE) => {
  const stringLocations = locations
    .map((location) => `${location.coordinate.longitude},${location.coordinate.latitude}`)
    .join(';');
  const url = `http://routing.openstreetmap.de/${driving}/route/v1/driving/${stringLocations}?overview=false`;
  console.log(url);
  const result = await axios.get(url);
  return result.data;
};

const infoDirectionSearch = async (locations, driving = DRIVING.BIKE) => {
  const stringLocations = locations.map((location) => `${location.longitude},${location.latitude}`).join(';');
  const url = `http://routing.openstreetmap.de/${driving}/route/v1/driving/${stringLocations}?overview=false`;
  console.log(url);
  const result = await axios.get(url);
  return result.data;
};

export { direction, infoDirection, infoDirectionSearch };
