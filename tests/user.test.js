import request from 'supertest';
import app from '../index.js';
import * as dbHandler from './testDb.js';

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('User Endpoints', () => {
    let token;
    const adminUser = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
    };

    beforeEach(async () => {
        const res = await request(app)
            .post('/auth/register')
            .send(adminUser);
        token = res.body.token;
    });

    it('should get all users', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(1);
    });

    it('should get user by ID', async () => {
        const createRes = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Another User',
                email: 'another@example.com',
                password: 'password123'
            });

        const userId = createRes.body._id;
        const res = await request(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('email', 'another@example.com');
    });

    it('should update user', async () => {
        const createRes = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Update Me',
                email: 'update@example.com',
                password: 'password123'
            });

        const userId = createRes.body._id;
        const res = await request(app)
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Name' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated Name');
    });

    it('should delete user', async () => {
        const createRes = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Delete Me',
                email: 'delete@example.com',
                password: 'password123'
            });

        const userId = createRes.body._id;
        const res = await request(app)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });

    it('should deny access without token', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(401);
    });
});
