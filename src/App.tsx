import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AllTeams from './pages/AllTeams';
import Lakers from './pages/Lakers';
import Bulls from './pages/Bulls';
import Rockets from './pages/Rockets';
import Warriors from './pages/Warriors';
import Celtics from './pages/Celtics';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllTeams />}/>
        <Route path="/lakers" element={<Lakers />}/>
        <Route path="/bulls" element={<Bulls />}/>
        <Route path="/rockets" element={<Rockets />}/>
        <Route path="/warriors" element={<Warriors />}/>
        <Route path="/celtics" element={<Celtics />}/>
      </Routes>
    </>
  );
}

export default App;
