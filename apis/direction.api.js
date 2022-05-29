import axios from 'axios';

const direction = async (locations, query = '') => {
  const stringLocations = locations.map((location) => `${location.longitude},${location.latitude}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${stringLocations}?${query}overview=false&steps=true`;
  const result = await axios.get(url);
  console.log(url);
  return result.data;
};

export { direction };
