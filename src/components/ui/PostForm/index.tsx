import { FC, useState } from 'react';

import { RootState, useAppDispatch } from '../../../state/store';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import { PostsApi } from '../../../services/api/PostsApi';
import { changeEditableId } from '../../../state/posts/postEditSlice';
import { addNewPost, editPost } from '../../../state/posts/slice';
import { Status } from '../../../types/fetchStatus';

interface PostFormProps {
  type: 'create' | 'edit';
  textareaValue?: string;
}

const PostFormSchema = yup
  .object({
    text: yup
      .string()
      .min(1, 'Post must be at least 1 characters long')
      .max(140, 'Post must be at most 140 characters long')
      .required('Text is required'),
  })
  .required();

const PostForm: FC<PostFormProps> = ({ type, textareaValue }) => {
  const dispatch = useAppDispatch();

  const { editableId } = useSelector((state: RootState) => state.postEdit);

  const [status, setStatus] = useState<Status>(Status.NEVER);
  const [editStatus, setEditStatus] = useState<Status>(Status.NEVER);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ text: string }>({
    resolver: yupResolver(PostFormSchema),
    defaultValues: {
      text: textareaValue,
    },
  });

  const createMode = (data: { text: string }) => {
    setStatus(Status.LOADING);

    PostsApi.createPost(data.text)
      .then((res) => {
        setStatus(Status.SUCCESS);
        dispatch(addNewPost(res.data));

        reset();
      })
      .catch((err) => {
        setStatus(Status.ERROR);
      });
  };

  const editMode = (data: { text: string }) => {
    if (!editableId) return;

    setEditStatus(Status.LOADING);

    PostsApi.editPost(data.text, editableId)
      .then((res) => {
        setEditStatus(Status.SUCCESS);

        dispatch(editPost(res.data));
        dispatch(changeEditableId(null));
      })
      .catch((err) => {
        setEditStatus(Status.ERROR);
      });
  };

  const onSubmit = (data: { text: string }) => {
    type === 'create' ? createMode(data) : editMode(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea placeholder="What's on your mind?" {...register('text')} />
        {errors.text?.message}
        <button type='submit'>Post</button>
      </form>

      {status === Status.ERROR && <div>Error, unable to {type} post</div>}

      {status === Status.LOADING && <div>Loading...</div>}
    </>
  );
};

export default PostForm;
