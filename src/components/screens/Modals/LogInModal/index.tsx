import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { auth } from '../../../../state/auth/asyncActions';
import { RootState, useAppDispatch } from '../../../../state/store';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Status } from '../../../../types/fetchStatus';
import Modal from '../../../ui/Modal';
import { LogInFormProps } from './types';

import { openPopup } from '../../../../state/notificationPopup/slice';
import Button from '../../../ui/Buttons/Button';
import RegisterModal from '../RegisterModal';
import './../../../../styles/ui/formElements.scss';

const LogInFormSchema = yup
	.object({
		email: yup
			.string()
			.email('Please enter valid Email')
			.required('Email is required'),
		password: yup
			.string()
			.min(6, 'Please enter valid Password')
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
		dispatch(auth({ type: 'login', credentials })).then((data) => {
			if (data.payload.token) {
				dispatch(
					openPopup({ message: 'Logged in successfully', status: 'success' })
				);
			}
		});
	};

	useEffect(() => {
		if (status === Status.ERROR && error) {
			dispatch(openPopup({ message: error as string, status: 'error' }));
		}
	}, [status, error, dispatch]);

	return (
		<Modal title='Log In' id='login'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={`input ${errors.email && 'input__error'}`}>
					<input placeholder='Email' type='text' {...register('email')} />
					{errors.email ? (
						<p className='input__error-message'>{errors.email?.message}</p>
					) : null}
				</div>

				<div className={`input ${errors.password && 'input__error'}`}>
					<input
						placeholder='Password'
						type='password'
						{...register('password')}
					/>
					{errors.password ? (
						<p className='input__error-message'>{errors.password?.message}</p>
					) : null}
				</div>

				{status === Status.ERROR && error ? (
					<p className='error-message'>{error as string}</p>
				) : null}

				<Button type='submit'>Log In</Button>

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '2rem',
						gap: '1rem',
					}}
				>
					<p>Don't have an account?</p>

					<RegisterModal />
				</div>
			</form>
		</Modal>
	);
};

export default LogInModal;
