import { Route, Routes } from 'react-router-dom';
import { useCheckAuth } from './hooks/useCheckAuth';

import { Home, Login, NotFound, Post, Profile } from './pages';

function App() {
  useCheckAuth();

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/:id' element={<Post />} />
        <Route path='profile/:id' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
