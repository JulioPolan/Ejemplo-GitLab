const express = require('express');
const app = express();

app.use(express.json());

// Endpoint de Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // 1. Validar que vengan ambos campos
  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Se requieren usuario y contraseña' 
    });
  }

  // 2. Validar credenciales correctas
  if (username === 'admin' && password === 'secreto123') {
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: 'jwt-falso-de-prueba-12345'
    });
  }

  // 3. Credenciales incorrectas
  return res.status(401).json({ 
    error: 'Credenciales inválidas' 
  });
});

module.exports = app;