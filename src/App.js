import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Appbar from './components/Appbar';
import Login from './components/Login'; // Importa el componente de login

function App() {
  return (
    <Router>
      <div className="App">
        <Appbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Puedes agregar más rutas aquí si es necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
