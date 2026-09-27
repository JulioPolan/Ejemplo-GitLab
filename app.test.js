const request = require('supertest');
const app = require('./app');

describe('Pruebas del endpoint POST /api/login', () => {

  test('Debe iniciar sesión con credenciales correctas (200 OK)', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'secreto123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.message).toBe('Inicio de sesión exitoso');
  });

  test('Debe rechazar credenciales incorrectas (401 Unauthorized)', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'password_erronea'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Credenciales inválidas');
  });

  test('Debe fallar si falta la contraseña (400 Bad Request)', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        username: 'admin'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Se requieren usuario y contraseña');
  });

});