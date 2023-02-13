import axios from '../axios'

export interface getCommentsOptions {
	postId: string
	limit?: number
	page?: number
}

export const CommentsApi = {
	async getAll(options: getCommentsOptions) {
		const { postId, ...reqOptions } = options

		const { data } = await axios.get(`posts/${options.postId}/comments`, {
			params: reqOptions,
		})

		return data
	},

	async create(postId: string, text: string) {
		const { data } = await axios.post(`posts/${postId}/comment`, {
			text,
		})

		return data
	},
}
