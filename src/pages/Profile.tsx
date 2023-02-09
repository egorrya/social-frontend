import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();

  return <div>Profile</div>;
};

export default Profile;
