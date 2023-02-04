import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.scss';
import AllTeams from './pages/AllTeams';
import Lakers from './pages/Lakers';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllTeams />}/>
        <Route path="/lakers" element={<Lakers />}/>
        <Route path="/bulls" element={<Lakers />}/>
      </Routes>
    </>
  );
}

export default App;
