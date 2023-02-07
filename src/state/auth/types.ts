import { Status } from '../../types/fetchStatus';

export interface User {
  _id: string;
  fullName?: string;
  username: string;
  email: string;
  following?: string[] | null;
  followers?: string[] | null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface authSliceState {
  user: User | null;
  status: Status;
  error: unknown;
  loggedIn: boolean;
  loggedInWithSubmit: boolean;
}
