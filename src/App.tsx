import { Route, Routes } from 'react-router-dom';
import { useCheckAuth } from './hooks/useCheckAuth';

import { Home, NotFound, Post, Profile } from './pages';
import Followers from './pages/Profile/Followers';
import Following from './pages/Profile/Following';

function App() {
	useCheckAuth();

	return (
		<>
			<Routes>
				<Route path='*' element={<NotFound />} />
				<Route path='/' element={<Home />} />

				<Route path='/posts/:id' element={<Post />} />
				<Route path='/:username' element={<Profile />} />
				<Route path='/:username/followers' element={<Followers />} />
				<Route path='/:username/following' element={<Following />} />
			</Routes>
		</>
	);
}

export default App;
