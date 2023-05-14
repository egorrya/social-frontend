import { FC } from 'react';
import { IconProps } from './types';

const AddImageIcon: FC<IconProps> = ({
	className,
	onClick,
	color = '#222222',
}) => {
	return (
		<svg
			className={className}
			onClick={onClick}
			fill='none'
			height='24'
			viewBox='0 0 24 24'
			width='24'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M3 16C4.40293 15.7662 6.63687 15.7073 8.94504 16.2427M16 21C14.2965 18.2317 11.5726 16.8522 8.94504 16.2427M8.94504 16.2427C10.8946 13.9852 14.5577 12 21 12H22M8.5 7C8 7 7 7.3 7 8.5C7 9.7 8 10 8.5 10C9 10 10 9.7 10 8.5C10 7.3 9 7 8.5 7Z'
				stroke={color}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
			/>
			<path
				d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2'
				stroke={color}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
			/>
			<path
				d='M19 2V5M19 8V5M19 5H22M19 5H16'
				stroke={color}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
			/>
		</svg>
	);
};

export default AddImageIcon;
