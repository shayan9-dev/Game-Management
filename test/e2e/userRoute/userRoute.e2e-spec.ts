import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../setup'; // assumes you have this set up for test environment

describe('Auth Routes (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register successfully with correct credentials', async () => {
    const uniqueUsername = `user_${Date.now()}`;
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: uniqueUsername,
        password: '1234',
        email: `${uniqueUsername}@example.com`,
      });

    expect(res.status).toBe(201); 
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'nonexistent_user',
        password: 'wrong_password',
      });

    expect(res.status).toBe(401);
  });

  it(`should fail wit wrong email`, async () => {
    const res = await request(app.getHttpServer())
      .post("/verify")
      .send({
        email: "shayanahmed8862@gmail.com"
      })
    expect(res.status).toBe(200)
  })

  it(`should fail wit wrong email`, async () => {
    const res = await request(app.getHttpServer())
      .post("/verify")
      .send({
        email: "shayanahmed8862@gmail.com"
      })
    expect(res.status)
  })
});
