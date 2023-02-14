import { useParams } from 'react-router-dom';
import Posts from '../components/screens/Posts';

const Profile = () => {
	const { username } = useParams();

	return (
		<>Profile{username && <Posts filter='user_posts' username={username} />}</>
	);
};

export default Profile;
