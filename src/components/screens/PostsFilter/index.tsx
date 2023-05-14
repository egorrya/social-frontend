import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { setActiveHomeFilter } from '../../../state/filters/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { homeFilterType } from '../../../types';

import styles from './PostsFilter.module.scss';

const PostsFilter: FC = () => {
	const dispatch = useAppDispatch();

	const { activeHomeFilter } = useSelector((state: RootState) => state.filters);
	const { loggedIn } = useSelector((state: RootState) => state.auth);

	const [filterHover, setFilterHover] = useState<homeFilterType | null>(null);
	const filterWrapperRef = useRef<HTMLDivElement | null>(null);
	const filterRef = useRef<HTMLUListElement | null>(null);
	const [sticky, setSticky] = useState(false);

	const filterTypes: homeFilterType[] = ['all', 'popular', 'feed'];

	useEffect(() => {
		const handleScroll = () => {
			const header = document.querySelector('header');

			if (
				filterWrapperRef.current?.offsetTop &&
				header &&
				window.pageYOffset >
					filterWrapperRef.current.offsetTop + header.clientHeight
			) {
				setSticky(true);
			} else {
				setSticky(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [filterWrapperRef.current?.offsetTop]);

	return (
		<>
			<div
				ref={filterWrapperRef}
				className={styles.wrapper}
				style={{
					height:
						filterRef.current?.clientHeight &&
						filterRef.current.clientHeight + 10,
					position: 'relative',
				}}
			>
				<div
					className='fixed-wrapper'
					style={{
						position: sticky ? 'fixed' : 'absolute',
						top: sticky ? '0' : 'auto',
					}}
				>
					<ul
						ref={filterRef}
						className={`${styles.filter} ${sticky && styles.sticky}`}
					>
						{filterTypes.map((filterType) => {
							if (filterType === 'feed' && !loggedIn) return null;

							return (
								<li
									key={filterType}
									className={`${
										((!filterHover && activeHomeFilter === filterType) ||
											filterHover === filterType) &&
										styles.active
									}`}
									onClick={() => dispatch(setActiveHomeFilter(filterType))}
									onMouseEnter={() => setFilterHover(filterType)}
									onMouseLeave={() => setFilterHover(null)}
								>
									{filterType}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

export default PostsFilter;
