import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
	src: string;
	lqipSrc?: string;
	alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
	src,
	lqipSrc,
	alt,
	...props
}) => {
	const [loaded, setLoaded] = useState(false);
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0,
	});

	const handleImageLoad = () => {
		setLoaded(true);
	};

	const cloudinaryLqip = src.includes('cloudinary')
		? src.split('upload/')[0] +
		  'upload/w_300/e_blur:200,f_auto/' +
		  src.split('/')[src.split('/').length - 1]
		: src;

	const actualSrc = inView
		? src
		: cloudinaryLqip !== src
		? cloudinaryLqip
		: lqipSrc;
	const blurAmount = loaded ? 0 : 5;

	return (
		<img
			ref={ref}
			src={actualSrc}
			alt={alt}
			onLoad={handleImageLoad}
			style={{
				filter: `blur(${blurAmount}px)`,
				transition: 'filter .5s',
				border: '1px solid #eaeaea',
			}}
			{...props}
		/>
	);
};

export default LazyImage;
