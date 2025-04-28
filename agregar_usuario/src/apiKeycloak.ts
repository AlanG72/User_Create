export const obtenerToken = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/realms/realm-adduser/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: 'adduser-client', // ID del cliente en Keycloak
          grant_type: 'password',
          username: username,     // Usuario ingresado
          password: password,     // Contraseña ingresada
        }),
      });
  
      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }
  
      const data = await response.json();
      return data.access_token; // Retorna el token de acceso
    } catch (error) {
      console.error('Error al obtener el token:', error);
      throw error;
    }
  };
  
  export const verificarUsuario = async (username: string, token: string) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/realms/realm-adduser/users?username=${username}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Autenticación con el token
        },
      });
  
      if (!response.ok) {
        throw new Error('No se pudo verificar el usuario');
      }
  
      const usuarios = await response.json();
      return usuarios.length > 0; // Devuelve true si el usuario existe
    } catch (error) {
      console.error('Error al verificar usuario:', error);
      throw error;
    }
  };

  export const registrarUsuario = async (nuevoUsuario: { username: string; email: string; password: string }, token: string) => {
    try {
      const response = await fetch('http://localhost:8080/admin/realms/realm-adduser/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: nuevoUsuario.username,
          email: nuevoUsuario.email,
          enabled: true, // Habilitar al usuario
          credentials: [
            {
              type: 'password',
              value: nuevoUsuario.password,
              temporary: false, // Contraseña permanente
            },
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
  
      alert('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  };