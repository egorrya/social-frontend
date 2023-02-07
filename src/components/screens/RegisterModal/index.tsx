import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { auth } from '../../../state/auth/asyncActions';
import { disableModal } from '../../../state/modal/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';

import Modal from '../../ui/Modal';
import { RegisterFormProps } from './types';

const RegisterFormSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter valid Email')
      .required('Email is required'),

    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),

    username: yup
      .string()
      .min(2, 'Username must be at least 6 characters long')
      .required('Username is required'),
  })
  .required();

const RegisterModal = () => {
  const dispatch = useAppDispatch();
  const { error, status } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (credentials: RegisterFormProps) => {
    dispatch(auth({ type: 'register', credentials }));
  };

  useEffect(() => {
    if (status === Status.SUCCESS) dispatch(disableModal());
    // todo - add error notification
    if (status === Status.ERROR) console.log(error);
  }, [dispatch, error, status]);

  // todo - repeat password field

  return (
    <Modal title='Register' id='register'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Your Email' type='text' {...register('email')} />
        <p>{errors.email?.message}</p>

        <input
          placeholder='Password'
          type='password'
          {...register('password')}
        />
        <p>{errors.password?.message}</p>

        <input placeholder='Username' type='text' {...register('username')} />
        <p>{errors.username?.message}</p>

        <input placeholder='Your Name' type='text' {...register('fullName')} />
        <p>{errors.fullName?.message}</p>

        <button type='submit'>Register</button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
