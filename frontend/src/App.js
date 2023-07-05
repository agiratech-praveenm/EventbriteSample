import React from 'react';
import './App.css';
import { BrowserRouter,
  Routes,
  Route,
  } from 'react-router-dom';
import Homepage from './components/homepage';
import Login from './components/login';
import Signup from './components/signup';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;