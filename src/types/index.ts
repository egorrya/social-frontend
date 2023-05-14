export interface User {
	_id: string;
	fullName?: string;
	username: string;
	email: string;
	following: Array<string>;
	followers: Array<string>;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	avatar?: string;
}

export interface Comment {
	_id: string;
	text: string;
	user: {
		_id: string;
		username: string;
		avatar?: string;
		fullName?: string;
	};
	createdAt: string;
}

export type homeFilterType = 'all' | 'popular' | 'feed';
