import { LogInFormProps } from '../../components/screens/LogInModal/types';
import axios from '../axios';

export const AuthApi = {
  async logIn(credentials: LogInFormProps) {
    const { data } = await axios.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });

    return data;
  },

  async getMe() {
    const { data } = await axios.get('/auth/me');

    return data;
  },
};
