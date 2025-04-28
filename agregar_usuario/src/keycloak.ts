import Keycloak from 'keycloak-js';

// Configura Keycloak apuntando al realm y al cliente que creaste
const keycloak = new Keycloak({
  url: 'http://localhost:8080', // URL de tu servidor Keycloak
  realm: 'realm-adduser',           // Nombre de tu realm
  clientId: 'adduser-client',      // ID del cliente en Keycloak
});

export default keycloak;