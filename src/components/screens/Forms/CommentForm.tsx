import { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CommentsApi } from '../../../services/api/CommentsApi';
import { addNewComment } from '../../../state/comments/slice';
import { addCommentCountToSinglePost } from '../../../state/posts/singlePostSlice';
import { addCommentsCount } from '../../../state/posts/slice';
import { useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';

import '../../../styles/ui/textareaForm.scss';
import Button from '../../ui/Buttons/Button';
import CircularProgressBar from '../../ui/CircularProgressBar';
import EmptyCard from '../../ui/EmptyCard';

interface CommentFormProps {
	postId: string | undefined;
}

const CommentFormSchema = yup
	.object({
		text: yup
			.string()
			.min(1, 'Comment must be at least 1 characters long')
			.max(140, 'Comment must be at most 140 characters long')
			.required('Text is required'),
	})
	.required();

const CommentForm: FC<CommentFormProps> = ({ postId }) => {
	const dispatch = useAppDispatch();

	const [status, setStatus] = useState<Status>(Status.NEVER);

	const { watch, register, handleSubmit, formState, reset } = useForm<{
		text: string;
	}>({
		resolver: yupResolver(CommentFormSchema),
	});

	const onSubmit = (data: { text: string }) => {
		if (!postId) return;

		setStatus(Status.LOADING);

		CommentsApi.create(postId, data.text)
			.then((res) => {
				setStatus(Status.SUCCESS);
				dispatch(addNewComment(res.data));
				dispatch(addCommentsCount(postId));
				dispatch(addCommentCountToSinglePost());

				reset();
			})
			.catch((err) => {
				setStatus(Status.ERROR);
			});
	};

	if (status === Status.LOADING) return <EmptyCard />;

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className='form'>
				<textarea placeholder="What's on your mind?" {...register('text')} />
				{watch('text')?.length > 140 && (
					<p className='form__errorMessage'>
						Comment must be at most 140 characters long
					</p>
				)}
				<div className='form__panel'>
					<CircularProgressBar
						percentage={watch('text') ? (watch('text').length / 140) * 100 : 0}
						text={false}
						sqSize={33}
						strokeWidth={5}
					/>
					<Button disabled={!formState.isValid} type='submit'>
						Comment
					</Button>
				</div>
			</form>

			{status === Status.ERROR && (
				<EmptyCard emoji='😢' gradient={false}>
					Error, unable to create comment
				</EmptyCard>
			)}
		</>
	);
};

export default CommentForm;
