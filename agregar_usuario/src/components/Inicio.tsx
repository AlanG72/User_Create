import React from 'react';

const Inicio: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // Centrado horizontal
    alignItems: 'center', // Centrado vertical
    height: '100vh', // Ocupar toda la pantalla
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: '3em',
    color: '#343a40',
  },
};

export default Inicio;