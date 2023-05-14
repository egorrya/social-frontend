import { FC } from 'react';

import styles from './CircularProgressBar.module.scss';

interface CircularProgressBarProps {
	sqSize?: number;
	strokeWidth?: number;
	percentage?: number;
	text?: boolean;

	mainColor?: string;
	backgroundColor?: string;
	className?: string;
}

const CircularProgressBar: FC<CircularProgressBarProps> = ({
	sqSize = 200,
	strokeWidth = 10,
	percentage = 25,
	text = true,
	mainColor = '#3f51b5',
	backgroundColor = '#e0e0de',
	className,
}) => {
	const percentageProgress = Number(
		percentage > 100 ? 100 : percentage.toFixed(0)
	);
	// SVG centers the stroke width on the radius, subtract out so circle fits in square
	const radius = (sqSize - strokeWidth) / 2;
	// Enclose circle in a circumscribing square
	const viewBox = `0 0 ${sqSize} ${sqSize}`;
	// Arc length at 100% coverage is the circle circumference
	const dashArray = radius * Math.PI * 2;
	// Scale 100% coverage overlay with the actual percent
	const dashOffset = dashArray - (dashArray * percentageProgress) / 100;

	return (
		<svg
			className={className}
			width={sqSize}
			height={sqSize}
			viewBox={viewBox}
			style={{ position: 'relative' }}
		>
			<circle
				className={styles.circleBackground}
				cx={sqSize / 2}
				cy={sqSize / 2}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
				style={{ stroke: backgroundColor }}
			/>
			<circle
				className={styles.circleProgress}
				cx={sqSize / 2}
				cy={sqSize / 2}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
				// Start progress marker at 12 O'Clock
				transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
				style={{
					strokeDasharray: dashArray,
					strokeDashoffset: dashOffset,
					stroke: mainColor,
				}}
			/>
			{text && (
				<text
					className={styles.circleText}
					x='50%'
					y='50%'
					dy='.3em'
					textAnchor='middle'
					style={{ fill: mainColor }}
				>
					{`${percentageProgress}%`}
				</text>
			)}
		</svg>
	);
};

export default CircularProgressBar;
