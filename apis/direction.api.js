import axios from 'axios';

const direction = async (locations, query = '') => {
  const stringLocations = locations
    .map((location) => `${location.coordinate.longitude},${location.coordinate.latitude}`)
    .join(';');
  const url = `http://router.project-osrm.org/route/v1/driving/${stringLocations}?${query}overview=false&steps=true&alternatives=true`;
  console.log(url);
  const result = await axios.get(url);
  return result.data;
};

const infoDirection = async (locations) => {
  const stringLocations = locations.map((location) => `${location.longitude},${location.latitude}`).join(';');
  const url = `http://router.project-osrm.org/route/v1/driving/${stringLocations}?overview=false`;
  console.log(url);
  const result = await axios.get(url);
  return result.data;
};

export { direction, infoDirection };
