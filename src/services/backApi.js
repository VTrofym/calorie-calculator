import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://slimmom-backend.goit.global',
});

export const getPublicData = async values => {
  try {
    const { data } = await axiosInstance.post('/daily-rate', values);

    return data;
  } catch (error) {
    console.error(error);
  }
};
