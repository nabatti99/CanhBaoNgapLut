import axios from 'axios';

const direction = async (locations, query = '') => {
  const stringLocations = locations.map((location) => `${location.longitude},${location.latitude}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${stringLocations}?${query}overview=false&steps=true&alternatives=true`;
  console.log(url);
  const result = await axios.get(url);
  return result.data;
};

export { direction };
