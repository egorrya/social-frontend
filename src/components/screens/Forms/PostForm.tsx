import { FC, useEffect, useState } from 'react';

import { RootState, useAppDispatch } from '../../../state/store';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { v4 as uuidv4 } from 'uuid';

import { useSelector } from 'react-redux';
import { PostsApi } from '../../../services/api/PostsApi';
import { changeEditableId } from '../../../state/posts/postEditSlice';
import { addNewPost, editPost } from '../../../state/posts/slice';
import { Status } from '../../../types/fetchStatus';

import Button from '../../ui/Buttons/Button';
import CircularProgressBar from '../../ui/CircularProgressBar';

import AddImageIcon from '../../../assets/svg/AddImageIcon';
import XIcon from '../../../assets/svg/XIcon';
import { openPopup } from '../../../state/notificationPopup/slice';
import { editSinglePost } from '../../../state/posts/singlePostSlice';
import '../../../styles/ui/textareaForm.scss';
import EmptyCard from '../../ui/EmptyCard';

interface PostFormProps {
	type: 'create' | 'edit';
	textareaValue?: string;
	imageUrlValue?: string;
	isSinglePostPage?: boolean;
}

interface PostFormValues {
	text: string;
	image?: FileList;
}

const PostFormSchema = yup.object().shape({
	text: yup
		.string()
		.max(140, 'Text must be at most 140 characters')
		.when(
			'image',
			(image: FileList | undefined, schema: yup.StringSchema): any => {
				if (
					('$imageUrlValue' as string | undefined) !==
					('$previewImage' as string | undefined)
				) {
					return schema.notRequired();
				}

				if (!image || image.length === 0)
					return schema.required('At least one symbol or image is required');
			}
		),
	image: yup
		.mixed()
		.test(
			'fileSize',
			'File size must be less than 1MB',
			(value: FileList | undefined) =>
				value === undefined || value.length === 0 || value[0].size <= 1000000
		)
		.notRequired(),
});

const PostForm: FC<PostFormProps> = ({
	type,
	textareaValue,
	imageUrlValue,
	isSinglePostPage = false,
}) => {
	const dispatch = useAppDispatch();

	const inputId = uuidv4();

	const { activeHomeFilter } = useSelector((state: RootState) => state.filters);
	const { editableId } = useSelector((state: RootState) => state.postEdit);

	const [status, setStatus] = useState<Status>(Status.NEVER);
	const [editStatus, setEditStatus] = useState<Status>(Status.NEVER);
	const [previewImage, setPreviewImage] = useState<string | undefined>(
		imageUrlValue
	);
	const [imageInputSize, setImageInputSize] = useState<number>(0);

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		setFocus,
	} = useForm<PostFormValues>({
		resolver: yupResolver(PostFormSchema),
		defaultValues: {
			text: textareaValue,
		},
		context: {
			previewImage,
			imageUrlValue,
		},
	});

	useEffect(() => {
		if (type === 'edit') {
			setFocus('text');

			if (imageUrlValue) setPreviewImage(imageUrlValue);
		}
	}, [editableId, imageUrlValue, setFocus, type]);

	const createMode = (data: PostFormValues) => {
		setStatus(Status.LOADING);

		const image = data.image ? data.image[0] : undefined;

		PostsApi.createPost(data.text, image)
			.then((res) => {
				setStatus(Status.SUCCESS);
				if (activeHomeFilter !== 'popular') dispatch(addNewPost(res.data));
				dispatch(openPopup({ message: 'Post created!', status: 'success' }));

				reset();
				handleClearImage();
			})
			.catch((err) => {
				setStatus(Status.ERROR);
				dispatch(
					openPopup({ message: 'Something went wrong!', status: 'error' })
				);
			});
	};

	const editMode = (data: PostFormValues) => {
		if (!editableId) return;

		setEditStatus(Status.LOADING);

		const image = data.image ? data.image[0] : undefined;

		const imageUrl = previewImage === imageUrlValue ? imageUrlValue : undefined;

		PostsApi.editPost(editableId, data.text, imageUrl, image)
			.then((res) => {
				setEditStatus(Status.SUCCESS);

				isSinglePostPage
					? dispatch(editSinglePost(res.data))
					: dispatch(editPost(res.data));
				dispatch(changeEditableId(null));

				dispatch(openPopup({ message: 'Post edited!', status: 'success' }));

				reset();
				handleClearImage();
			})
			.catch((err) => {
				setEditStatus(Status.ERROR);
				dispatch(
					openPopup({ message: 'Something went wrong!', status: 'error' })
				);
			});
	};

	const onSubmit = (data: PostFormValues) => {
		type === 'create' ? createMode(data) : editMode(data);
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();

			reader.onload = (e) => {
				if (typeof e.target?.result === 'string') {
					setPreviewImage(e.target.result);
				}
			};
			setImageInputSize(e.target.files[0].size);

			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleClearImage = () => {
		setPreviewImage(undefined);
		setValue('image', undefined);
		setImageInputSize(0);
	};

	const isTextMoreThan140 =
		watch('text') !== undefined && watch('text').length > 140;

	const isTextEmpty = watch('text') === '';

	const isSomethingChangedOnEdit =
		type === 'edit' &&
		watch('text') === textareaValue &&
		previewImage === imageUrlValue;

	const buttonDisabled =
		editStatus === Status.LOADING ||
		(errors?.image && true) ||
		(errors?.text && true) ||
		(isTextEmpty && !previewImage) ||
		(isTextEmpty && imageInputSize > 1000000) ||
		isTextMoreThan140 ||
		isSomethingChangedOnEdit
			? true
			: false;

	if (status === Status.LOADING || editStatus === Status.LOADING)
		return <EmptyCard />;

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`form ${
					type === 'create' && status === Status.NEVER && 'animate'
				}`}
			>
				<textarea placeholder="What's on your mind?" {...register('text')} />

				{(errors.text ||
					errors.image ||
					imageInputSize > 1000000 ||
					isTextMoreThan140) && (
					<div className='form__errorMessage'>
						{errors.text && (
							<p className='form__errorMessage-text'>{errors.text?.message}</p>
						)}
						{isTextMoreThan140 && (
							<p className='form__errorMessage-text'>
								Text must be at most 140 characters
							</p>
						)}

						{(imageInputSize > 1000000 || errors.image) && (
							<p className='form__errorMessage-text'>
								{imageInputSize > 1000000
									? 'File size must be less than 1MB'
									: errors.image?.message}
							</p>
						)}
					</div>
				)}

				<div className='form__panel'>
					<div className='form__image'>
						<label
							htmlFor={inputId}
							style={{ display: previewImage ? 'none' : 'flex' }}
						>
							<AddImageIcon />
							<input
								type='file'
								accept='image/*'
								id={inputId}
								{...register('image')}
								onChange={handleChangeImage}
							/>
						</label>
					</div>

					{previewImage && (
						<div className='form__preview'>
							<XIcon onClick={() => handleClearImage()} color='#ffffff' />

							<div className='form__preview__image'>
								<div className='form__preview__image--overlay'></div>
								<img src={previewImage} alt='Preview' />
							</div>
						</div>
					)}

					<CircularProgressBar
						percentage={watch('text') ? (watch('text').length / 140) * 100 : 0}
						text={false}
						sqSize={25}
						strokeWidth={2.5}
					/>
					<Button disabled={buttonDisabled} type='submit'>
						{type === 'create' ? 'Post' : 'Save'}
					</Button>
				</div>
			</form>

			{status === Status.ERROR && (
				<EmptyCard emoji='😢' gradient={false}>
					Error, unable to {type} post
				</EmptyCard>
			)}
		</>
	);
};

export default PostForm;
