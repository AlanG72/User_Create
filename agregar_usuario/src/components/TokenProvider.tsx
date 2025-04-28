import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import Login from '../components/Login';
import Inicio from '../components/Inicio';
import { TokenProvider } from '../components/TokenManager'; // Importa el TokenProvider

const App: React.FC = () => {
  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
};

export default App;