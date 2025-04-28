import { FaUser, FaKey } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar para la navegación

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/realms/realm-adduser/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: 'adduser-client', // Reemplaza con tu client_id
          client_secret: 'g1yIL8vL6W7ppyVR9I5KKCSKE5gBEXGB', // Reemplaza con tu client_secret
          grant_type: 'password',
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error en la autenticación: ${errorMessage}`);
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access_token); // Guarda el token para futuras solicitudes
      alert('Inicio de sesión exitoso');
      navigate('/inicio'); // Redirige a la página de inicio
    } catch (error: any) {
      console.error('Detalles del error:', error);
      alert(`Error al iniciar sesión: ${error.message}`);
    }
  };

  const goToRegister = () => {
    navigate('/register'); // Navega al formulario de registro
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <h1 style={styles.title}>Iniciar Sesión</h1>
      <div style={styles.field}>
        <label style={styles.label}>
          <FaUser style={{ marginRight: '8px' }} />
          Usuario
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu nombre de usuario"
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>
          <FaKey style={{ marginRight: '8px' }} />
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>
        Iniciar Sesión
      </button>
      <button type="button" style={styles.registerButton} onClick={goToRegister}>
        Registrarse
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: 'auto',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#343a40',
  },
  field: {
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#495057',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  registerButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;