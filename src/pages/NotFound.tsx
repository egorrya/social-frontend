import { FC } from 'react';
import PageLayout from '../components/layouts/PageLayout';
import EmptyCard from '../components/ui/EmptyCard';

const NotFound: FC = () => {
	return (
		<PageLayout>
			<EmptyCard emoji='😢' border={false} gradient={false}>
				404 - Page not found
			</EmptyCard>
		</PageLayout>
	);
};

export default NotFound;
