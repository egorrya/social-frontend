import { Route, Routes } from 'react-router-dom';
import { useCheckAuth } from './hooks/useCheckAuth';

import { Home, Login, NotFound, Post, Profile } from './pages';
import Followers from './pages/Profile/Followers';
import Following from './pages/Profile/Following';

function App() {
	useCheckAuth();

	return (
		<div className='App'>
			<Routes>
				<Route path='*' element={<NotFound />} />
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />

				<Route path='/posts/:id' element={<Post />} />
				<Route path='/:username' element={<Profile />} />
				<Route path='/:username/followers' element={<Followers />} />
				<Route path='/:username/following' element={<Following />} />
			</Routes>
		</div>
	);
}

export default App;
