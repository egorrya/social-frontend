import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { getMe } from './state/login/asyncActions';
import { useAppDispatch } from './state/store';

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getMe());
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
