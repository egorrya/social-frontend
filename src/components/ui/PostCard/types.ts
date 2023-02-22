export interface Post {
	_id: string;

	createdAt: string;
	user: {
		_id: string;
		username: string;
		avatar: string;
	};
	text: string;
	commentsCount: number;
	post_likes: string[];
	likesCount: number;
}

export interface PostCardProps {
	postData: Post;

	isSinglePostPage?: boolean;
}
