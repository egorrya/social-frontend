import axios from '../axios';

export interface fetchFollowUsersOptions {
	type: 'followers' | 'following';
	username: string;

	limit?: number;
	page?: number;
}

export const FollowApi = {
	async toggleFollow(userId: string) {
		const { data } = await axios.post(`/follow/`, { params: { id: userId } });

		return data;
	},

	async getList(options: fetchFollowUsersOptions) {
		const { data } = await axios.get(`/follow`, { params: options });

		return data;
	},
};
