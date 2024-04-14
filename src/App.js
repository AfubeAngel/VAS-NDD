import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import NDDForm from './components/NDDForm';
import VASPage from './components/VASpage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/vas" element={<VASPage />} />
          <Route path="/ndd" element={<NDDForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

