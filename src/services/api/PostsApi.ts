import axios from '../axios';

export interface getPostsOptions {
  limit?: number;
  page?: number;
}

export const PostsApi = {
  async getAll(options: any) {
    const { data } = await axios.get('/posts', { params: options });

    return data;
  },

  async createPost(text: string) {
    const { data } = await axios.post('/posts', { text });

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
