import { FC } from 'react';
import { Status } from '../../../types/fetchStatus';

interface LikeButtonProps {
	likeStatus: Status;
	isLiked: boolean;
	handleLike: () => void;
}
const LikeButton: FC<LikeButtonProps> = ({
	likeStatus,
	isLiked,
	handleLike,
}) => {
	if (likeStatus === Status.LOADING) {
		return <div>Loading...</div>;
	}

	if (likeStatus === Status.ERROR) {
		return <div>Error</div>;
	}

	return <button onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button>;
};

export default LikeButton;
