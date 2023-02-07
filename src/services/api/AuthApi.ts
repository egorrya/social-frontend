import { LogInFormProps } from '../../components/screens/LogInModal/types';
import { RegisterFormProps } from '../../components/screens/RegisterModal/types';

import axios from '../axios';

export interface AuthFormProps {
  type: 'register' | 'login';
  credentials: LogInFormProps | RegisterFormProps;
}

export const AuthApi = {
  async auth({ type, credentials }: AuthFormProps) {
    const { data } = await axios.post(`/auth/${type}`, credentials);

    return data;
  },

  async getMe() {
    const { data } = await axios.get('/auth/me');

    return data;
  },
};
