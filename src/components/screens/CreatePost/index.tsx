import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../../state/store';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { createPost } from '../../../state/postCreation/asyncActions';
import { addNewPost } from '../../../state/posts/slice';
import { Status } from '../../../types/fetchStatus';

const CreatePostSchema = yup
  .object({
    text: yup
      .string()
      .min(1, 'Post must be at least 1 characters long')
      .max(140, 'Post must be at most 140 characters long')
      .required('Text is required'),
  })
  .required();

const CreatePost: FC = () => {
  const dispatch = useAppDispatch();

  const { error, status, postData } = useSelector(
    (state: RootState) => state.postCreation
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ text: string }>({
    resolver: yupResolver(CreatePostSchema),
  });

  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(addNewPost(postData));

      // todo - add success notification
    }
    if (status === Status.ERROR) {
      console.log(error);

      // todo - add error notification
    }
  }, [dispatch, error, status, postData]);

  const onSubmit = (data: { text: string }) => {
    dispatch(createPost(data.text));
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea placeholder="What's on your mind?" {...register('text')} />
        {errors.text?.message}
        <button type='submit'>Post</button>
      </form>

      {status === Status.ERROR && <div>{error as string}</div>}

      {status === Status.LOADING && <div>Loading...</div>}
    </>
  );
};

export default CreatePost;
