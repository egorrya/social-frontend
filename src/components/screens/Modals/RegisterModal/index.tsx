import { FC, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import { auth } from '../../../../state/auth/asyncActions';
import { RootState, useAppDispatch } from '../../../../state/store';
import { Status } from '../../../../types/fetchStatus';

import Modal from '../../../ui/Modal';
import { RegisterFormProps } from './types';

import { openPopup } from '../../../../state/notificationPopup/slice';
import Button from '../../../ui/Buttons/Button';
import './../../../../styles/ui/formElements.scss';

const RegisterFormSchema = yup
	.object({
		email: yup
			.string()
			.email('Please enter valid Email')
			.required('Email is required'),

		password: yup
			.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),

		secondPassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match'),

		username: yup
			.string()
			.min(2, 'Username must be at least 2 characters')
			.required('Username is required'),
	})
	.required();

const RegisterModal: FC = () => {
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
		dispatch(auth({ type: 'register', credentials })).then((data) => {
			if (data.payload.token) {
				window.location.reload();
			}
		});
	};

	useEffect(() => {
		if (status === Status.ERROR)
			dispatch(openPopup({ message: error as string, status: 'error' }));
	}, [dispatch, error, status]);

	return (
		<Modal title='Register' id='register'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={`input ${errors.email && 'input__error'}`}>
					<input
						required
						placeholder='Email'
						type='text'
						{...register('email')}
					/>
					{errors.email && (
						<p className='input__error-message'>{errors.email?.message}</p>
					)}
				</div>

				<div className={`input ${errors.username && 'input__error'}`}>
					<input
						required
						placeholder='Username'
						type='text'
						{...register('username')}
						name='username'
					/>
					{errors.username && (
						<p className='input__error-message'>{errors.username?.message}</p>
					)}
				</div>

				<div className={`input ${errors.fullName && 'input__error'}`}>
					<input
						placeholder='Full Name'
						type='text'
						{...register('fullName')}
					/>
					{errors.fullName && (
						<p className='input__error-message'>{errors.fullName?.message}</p>
					)}
				</div>

				<div className={`input ${errors.password && 'input__error'}`}>
					<input
						required
						placeholder='Password'
						type='password'
						{...register('password')}
						name='password'
					/>
					{errors.password && (
						<p className='input__error-message'>{errors.password?.message}</p>
					)}
				</div>

				<div className={`input ${errors.secondPassword && 'input__error'}`}>
					<input
						required
						placeholder='Repeat Password'
						type='password'
						{...register('secondPassword')}
					/>
					{errors.secondPassword && (
						<p className='input__error-message'>
							{errors.secondPassword?.message}
						</p>
					)}
				</div>

				{status === Status.ERROR && error ? (
					<p className='error-message'>{error as string}</p>
				) : null}

				<Button type='submit'>Register</Button>
			</form>
		</Modal>
	);
};

export default RegisterModal;
