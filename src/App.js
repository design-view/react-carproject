import './App.css';
import Header from './components/Header';
import CarList from './components/CarList';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { useState } from 'react';
import Join from './components/Join';
import CarAdd from './components/CarAdd';
import CarDetail from './components/CarDetail';

function App() {
  //로그인 한상태인지 상태관리
  const [isAuthenticated, setAuth] = useState(false);
  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
      <div className='container'>
      <Routes>
        <Route path='/' element={<CarList/>}/>
        <Route path='/login' element={<Login setAuth={setAuth}/>} />
        <Route path="/join" element={<Join/>} />
        <Route path='/addCar' element={<CarAdd/>} />
        <Route path='/carDetail/:carId' element={<CarDetail/>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
