import React, { useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Appbar from './components/Appbar';
import Prediction from './components/Prediction';
import PredictionsTable from './components/PredictionsTable';
import { UserContext } from './context/UserContext';
import Login from './components/Login';
import { ResetPassword } from './components/ResetPassword';
import Register from './components/Register';

export default function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && location.pathname === '/') {
      navigate('/login');
    }
  }, [user, navigate, location]);

  return (
    <div className="App">
      <Appbar />
      <Routes>
        <Route path="/" element={<PredictionsTable />} />
        <Route path="/predict" element={user ? <Prediction /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
