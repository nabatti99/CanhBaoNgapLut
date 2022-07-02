import axios from 'axios';

const search = async (query = '') => {
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&accept-language=vi&addressdetails=1&limit=5&countrycodes=VN`;
  console.log(url);
  const result = await axios.get(url);
  return result.data;
};

export { search };
