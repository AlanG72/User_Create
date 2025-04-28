import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext<any>(null);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  // Función para obtener un nuevo access token
  const getAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:8080/realms/realm-adduser/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: 'adduser-client', // Reemplaza con tu client_id
          client_secret: 'g1yIL8vL6W7ppyVR9I5KKCSKE5gBEXGB', // Reemplaza con tu client_secret
          grant_type: 'client_credentials', // Flujo para obtener el token
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error al obtener el token: ${data.error_description || 'desconocido'}`);
      }

      const now = new Date().getTime();
      setAccessToken(data.access_token);
      setTokenExpiration(now + data.expires_in * 1000); // Guardar tiempo de expiración
      return data.access_token;
    } catch (error) {
      console.error('Error al obtener el token:', error);
      throw error;
    }
  };

  // Función para garantizar un token válido
  const getValidToken = async () => {
    const now = new Date().getTime();
    if (!accessToken || !tokenExpiration || tokenExpiration <= now) {
      return await getAccessToken(); // Obtener un nuevo token si ha expirado
    }
    return accessToken; // Usar el token actual si es válido
  };

  return (
    <TokenContext.Provider value={{ getValidToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenManager = () => {
  return useContext(TokenContext);
};