const request = require('supertest');
const express = require('express');
const router = require('../routers/status');
const statusModule = require('../modules/status');

const app = express();
app.use(express.json());
app.use('/api', router);

jest.mock('../modules/status', () => ({
    getStatusList: jest.fn(),
    addStatus: jest.fn(),
    updateStatus: jest.fn(),
    deleteStatus: jest.fn()
}));

describe('status router', () => {
    describe('GET /api/status', () => {
        it('should return statuses', async () => {
            statusModule.getStatusList.mockResolvedValue([{ id: 1, description: 'Test' }]);
            const response = await request(app).get('/api/status');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, description: 'Test' }]);
        });

        it('should return 500 if there is an error', async () => {
            statusModule.getStatusList.mockRejectedValue(new Error('Error getting statuses'));
            const response = await request(app).get('/api/status');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error getting statuses' });
        });
    });

    describe('POST /api/status', () => {
        it('should add a new status', async () => {
            statusModule.addStatus.mockResolvedValue({ id: 1, description: 'New Status' });
            const response = await request(app)
                .post('/api/status')
                .send({ description: 'New Status' });
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ id: 1, description: 'New Status' });
        });

        it('should return 500 if there is an error', async () => {
            statusModule.addStatus.mockRejectedValue(new Error('Error adding status'));
            const response = await request(app)
                .post('/api/status')
                .send({ description: 'New Status' });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error adding status' });
        });
    });

    describe('PUT /api/status/:id', () => {
        it('should update a status', async () => {
            statusModule.updateStatus.mockResolvedValue({ id: 1, description: 'Updated Status' });
            const response = await request(app)
                .put('/api/status/1')
                .send({ description: 'Updated Status' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, description: 'Updated Status' });
        });

        it('should return 500 if there is an error', async () => {
            statusModule.updateStatus.mockRejectedValue(new Error('Error updating status'));
            const response = await request(app)
                .put('/api/status/1')
                .send({ description: 'Updated Status' });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error updating status' });
        });
    });

    describe('DELETE /api/status/:id', () => {
        it('should delete a status', async () => {
            statusModule.deleteStatus.mockResolvedValue([{ id: 1, description: 'Deleted Status' }]);
            const response = await request(app).delete('/api/status/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, description: 'Deleted Status' }]);
        });

        it('should return 500 if there is an error', async () => {
            statusModule.deleteStatus.mockRejectedValue(new Error('Error deleting status'));
            const response = await request(app).delete('/api/status/1');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error deleting status' });
        });
    });
});
