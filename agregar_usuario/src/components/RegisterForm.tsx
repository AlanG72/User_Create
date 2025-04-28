import React, { useState } from 'react';
import { useTokenManager } from './TokenManager'; // Importa el TokenManager
import { FaUser, FaEnvelope, FaKey } from 'react-icons/fa';

const RegisterForm: React.FC = () => {
  const { getValidToken } = useTokenManager(); // Usar el TokenManager
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !firstName || !lastName || !email || !password) {
      alert('Todos los campos obligatorios deben ser completados.');
      return;
    }

    try {
      const accessToken = await getValidToken(); // Obtener un token válido

      const newUser = {
        username,
        email,
        firstName,
        lastName,
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: password,
            temporary: false,
          },
        ],
      };

      const response = await fetch('http://localhost:8080/admin/realms/realm-adduser/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Autorizar con el token obtenido
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al registrar el usuario: ${errorMessage}`);
      }

      alert('Usuario registrado exitosamente.');
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Error al registrar el usuario:', error.message);
      alert(`Hubo un problema al registrar el usuario: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registro de Usuario</h1>
      <div>
        <label>
          <FaUser style={{ marginRight: '8px' }} />
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa un nombre de usuario único"
        />
      </div>
      <div>
        <label>
          <FaUser style={{ marginRight: '8px' }} />
          Nombre
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Ingresa tu nombre"
        />
      </div>
      <div>
        <label>
          <FaUser style={{ marginRight: '8px' }} />
          Apellido
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Ingresa tu apellido"
        />
      </div>
      <div>
        <label>
          <FaEnvelope style={{ marginRight: '8px' }} />
          Correo Electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@ejemplo.com"
        />
      </div>
      <div>
        <label>
          <FaKey style={{ marginRight: '8px' }} />
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Crea una contraseña segura"
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;