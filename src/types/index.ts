export interface User {
	_id: string;
	fullName?: string;
	username: string;
	email: string;
	following?: number;
	followers?: number;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}
