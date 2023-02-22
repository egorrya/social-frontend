import axios from '../axios';

export interface fetchPostsOptions {
	filter: 'all' | 'user_posts' | 'feed' | 'popular';

	username?: string;

	likes?: number;

	sort?: 'asc' | 'desc';
	limit?: number;
	page?: number;

	clearPosts?: boolean;
}

export const PostsApi = {
	async getPosts(options: any) {
		const { data } = await axios.get('/posts', { params: options });

		return data;
	},

	async getPost(postId: string) {
		const { data } = await axios.get(`/posts/${postId}`);

		return data;
	},

	async createPost(text: string) {
		const { data } = await axios.post('/posts', { text });

		return data;
	},

	async editPost(text: string, postId: string) {
		const { data } = await axios.patch(`/posts/${postId}`, { text });

		return data;
	},

	async deletePost(postId: string) {
		const { data } = await axios.delete(`/posts/${postId}`);

		return data;
	},

	async toggleLike(postId: string) {
		const { data } = await axios.post(`/posts/${postId}/toggle-like`);

		return data;
	},
};
