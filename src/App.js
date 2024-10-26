import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Login from './components/Login';
import LandingPage from './components/LandingPage'; // Importar LandingPage
import './App.css';
import { ResetPassword } from './components/Resetpassword';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Appbar />
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Ruta para LandingPage */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
