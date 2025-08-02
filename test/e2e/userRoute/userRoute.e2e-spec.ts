import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../setup';


describe('Auth Routes (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/register')
      .send({ username: 'invalid', password: 'invalid' });

    expect(res.status).toBe(401);
  });

  it('should register successfully with correct credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/register')
      .send({ username: 'admin', password: '1234', email: 'shayan@gmail.com' }); 

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken'); 
  });
});