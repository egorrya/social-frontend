import { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CommentsApi } from '../../../services/api/CommentsApi';
import { addNewComment } from '../../../state/comments/slice';
import { useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';

interface CommentFormProps {
	postId: string | undefined;
}

const CommentFormSchema = yup
	.object({
		text: yup
			.string()
			.min(1, 'Post must be at least 1 characters long')
			.max(140, 'Post must be at most 140 characters long')
			.required('Text is required'),
	})
	.required();

const CommentForm: FC<CommentFormProps> = ({ postId }) => {
	const dispatch = useAppDispatch();

	const [status, setStatus] = useState<Status>(Status.NEVER);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<{ text: string }>({
		resolver: yupResolver(CommentFormSchema),
	});

	const onSubmit = (data: { text: string }) => {
		if (!postId) return;

		setStatus(Status.LOADING);

		CommentsApi.create(postId, data.text)
			.then(res => {
				setStatus(Status.SUCCESS);
				console.log(res);
				dispatch(addNewComment(res.data));

				reset();
			})
			.catch(err => {
				setStatus(Status.ERROR);
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<textarea placeholder="What's on your mind?" {...register('text')} />
				{errors.text?.message}
				<button type='submit'>Comment</button>
			</form>

			{status === Status.ERROR && <div>Error, unable to create comment</div>}

			{status === Status.LOADING && <div>Loading...</div>}
		</>
	);
};

export default CommentForm;
