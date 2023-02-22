import axios from '../axios';

export const UsersApi = {
	async getOne(username: string) {
		const { data } = await axios.get(`/users/${username}`);

		return data;
	},
};
