export interface Post {
	_id: string;

	createdAt: string;
	user: {
		_id: string;
		username: string;
		fullName: string;
		avatar: string;
	};
	text: string;
	comments: string[];
	commentsCount: number;
	post_likes: string[];
	likesCount: number;
	imageUrl?: string;
}

export interface PostCardProps {
	postData: Post;

	isSinglePostPage?: boolean;
}
