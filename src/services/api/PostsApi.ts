import axios from '../axios';

export interface fetchPostsOptions {
	filter: 'all' | 'user_posts' | 'feed' | 'popular';

	username?: string;

	likes?: number;

	sort?: 'asc' | 'desc';
	limit?: number;
	page?: number;

	clearPosts?: boolean;
	before: string;
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

	async createPost(text: string, image: File | null = null) {
		const formData = new FormData();

		if (image) formData.append('image', image);
		formData.append('text', text);

		const { data } = await axios.post('/posts', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return data;
	},

	async editPost(
		postId: string,
		text: string,
		imageUrl: string | undefined,
		image: File | null = null
	) {
		const formData = new FormData();

		if (imageUrl) {
			formData.append('imageUrl', imageUrl);
		} else if (image) {
			formData.append('image', image);
		}
		formData.append('text', text);

		const { data } = await axios.patch(`/posts/${postId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

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
