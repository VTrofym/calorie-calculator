import { fetchStatus } from 'redux/diary/fetchStatus';

export const initialState = {
  email: '',
  username: '',
  id: '',
  userData: {
    weight: '',
    height: '',
    age: '',
    bloodType: '',
    desiredWeight: '',
    dailyRate: '',
    notAllowedProducts: [],
  },
  days: '',
  error: null,
  status: fetchStatus.init,
};
