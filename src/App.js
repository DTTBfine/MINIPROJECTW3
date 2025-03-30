import { Routes, Route } from 'react-router-dom'
import { Home, Homepage, Login } from './containers';
import { path } from './ultils/constant'

function App() {
  return (
    // bg-slate-100
    <div className="">
      <Routes>
        <Route path={path.HOME} element={<Home />} >
          <Route path='*' element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
