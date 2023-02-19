import { User } from '../../types';
import { Status } from '../../types/fetchStatus';

export interface authSliceState {
	user: User | null;
	status: Status;
	error: unknown;
	loggedIn: boolean;
	loggedInWithSubmit: boolean;
}
