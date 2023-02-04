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
};
