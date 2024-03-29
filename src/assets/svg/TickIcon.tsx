import { FC } from 'react';
import { IconProps } from './types';

const TickIcon: FC<IconProps> = ({ className, onClick, color = '#222222' }) => {
	return (
		<svg
			className={className}
			onClick={onClick}
			enableBackground='new 0 0 128 128'
			height='16'
			id='Layer_1'
			version='1.1'
			viewBox='0 0 128 128'
			width='16'
		>
			<path
				d='M116.158,29.336l-4.975-4.975c-3.469-3.469-9.088-3.478-12.549-0.019L48.103,74.875L29.364,56.136  c-3.459-3.46-9.078-3.45-12.549,0.021l-4.974,4.974c-3.47,3.47-3.48,9.089-0.02,12.549L41.8,103.657  c1.741,1.741,4.026,2.602,6.31,2.588c2.279,0.011,4.559-0.852,6.297-2.59l61.771-61.771  C119.637,38.424,119.631,32.807,116.158,29.336z'
				fill={color}
			/>
		</svg>
	);
};

export default TickIcon;
