import React, { useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Appbar from './components/Appbar';
import Prediction from './components/Prediction';
import PredictionsTable from './components/PredictionsTable';
import { UserContext } from './context/UserContext';
import Login from './components/Login';

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Si el usuario está loggeado y no está en la página de predicciones, redirige a /predictions
    if (user && location.pathname === '/login') {
      navigate('/predictions');
    }
  }, [user, navigate, location]);

  return (
    <div className="App">
      <Appbar />
      <Routes>
        <Route path="/predict" element={user ? <Prediction /> : <Navigate to="/login" />} />
        <Route path="/predictions" element={<PredictionsTable />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/predictions" />} />
        <Route path="*" element={<Navigate to="/predictions" />} />
      </Routes>
    </div>
  );
}

export default App;
