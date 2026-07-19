import request from 'supertest';
import app from '../src/index.js';

describe('pruebas del Modulo de Salud (health)', () => {
    it('deberia retornar 200 OK y el mensaje de funcionamiento', async () => {
    const res = await request(app).get('/health');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
    expect(res.body.message).toBe('AssetMatrix API funcionando');
    });
});