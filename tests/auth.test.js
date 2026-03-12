import request from 'supertest';
import app from '../index.js';
import * as dbHandler from './testDb.js';

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('Auth Endpoints', () => {
    const user = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        age: 25,
        role: 'user'
    };

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send(user);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('email', user.email);
    });

    it('should not register a duplicate user', async () => {
        await request(app).post('/auth/register').send(user);
        const res = await request(app).post('/auth/register').send(user);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'User already exists');
    });

    it('should login an existing user', async () => {
        await request(app).post('/auth/register').send(user);
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: user.email,
                password: user.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
        await request(app).post('/auth/register').send(user);
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });
});
