import axios from 'axios';

const search = async (query = '') => {
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&accept-language=vi&addressdetails=1&limit=15&countrycodes=VN`;
  const result = await axios.get(url);
  return result.data;
};

const searchLocation = async (location) => {
  const string = `&lon=${location.longitude}&lat=${location.latitude}`;
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&countrycodes=VN${string}`;
  const result = await axios.get(url);
  return result.data;
};

export { search, searchLocation };
