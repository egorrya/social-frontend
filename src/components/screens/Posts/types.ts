export interface PostsProps {
	filter: 'all' | 'feed' | 'popular';
	username?: string;

	likes?: number;
	sort?: 'asc' | 'desc';
	limit?: number;
}

export interface UserPostsState {
	filter: 'user_posts';
	username: string;

	likes?: number;
	sort?: 'asc' | 'desc';
	limit?: number;
}
