import { Route, Routes } from 'react-router-dom';
import { useCheckAuth } from './hooks/useCheckAuth';

import Home from './pages/Home';
import LogIn from './pages/LogIn';

function App() {
  useCheckAuth();

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
