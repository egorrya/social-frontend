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
	isLiked: boolean;
	likesCount: number;
	isOwnPost: boolean;
}

export interface PostCardProps {
	postId: string;

	username: string;
	createdAt: string;
	text: string;
	likesCount: number;
	commentsCount: number;
	isLiked: boolean;
	isOwnPost: boolean;

	isSinglePostPage?: boolean;
}
