import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { auth } from '../../../state/auth/asyncActions';
import { disableModal } from '../../../state/modal/slice';
import { RootState, useAppDispatch } from '../../../state/store';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Status } from '../../../types/fetchStatus';
import Modal from '../../ui/Modal';
import { LogInFormProps } from './types';

const LogInFormSchema = yup
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

const LogInModal: FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { error, status } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormProps>({
    resolver: yupResolver(LogInFormSchema),
  });

  const onSubmit = (credentials: LogInFormProps) => {
    dispatch(auth({ type: 'login', credentials }));
  };

  useEffect(() => {
    if (status === Status.SUCCESS) dispatch(disableModal());
    // todo - add error notification
    if (status === Status.ERROR) console.log(error);
  }, [dispatch, error, status]);

  return (
    <Modal title='Log In' id='login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' {...register('email')} />
        <p>{errors.email?.message}</p>

        <input type='password' {...register('password')} />
        <p>{errors.password?.message}</p>

        <button type='submit'>Log In</button>
      </form>
    </Modal>
  );
};

export default LogInModal;
