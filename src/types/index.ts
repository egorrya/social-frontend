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
}
