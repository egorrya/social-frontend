import { FC } from 'react';
import * as yup from 'yup';

const CreatePostSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter valid Email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  })
  .required();

const CreatePost: FC = () => {
  return (
    <form>
      <textarea placeholder="What's on your mind?" />
      <button type='submit'>Post</button>
    </form>
  );
};

export default CreatePost;
