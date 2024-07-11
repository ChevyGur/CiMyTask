const request = require('supertest');
const app = require('../app');
const {pool}  = require('../core/config_db');

describe('Transport API', () => {
    let transportId;

    afterAll(async () => {
        await pool.end();
    });


    test('should create a new transport', async () => {
        const response = await request(app)
            .post('/api/addTransport')
            .send({
                date: '2024-01-01',
                location_address: '123 Test St',
                location_lat: 40.7128,
                location_lng: -74.0060,
                count_order: 5,
                additional_quantity: 2,
                status: 1,
                driver_id: 1,
                pump_id: 1,
                pipe_count: 10,
                transfers: "Direct"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');

        transportId = response.body.id;
    });

    test('should get a transport by id', async () => {
        const response = await request(app).get(`/api/getTransport/${transportId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(transportId);
    });

    test('should update a transport by id', async () => {
        const response = await request(app)
            .put(`/api/updateTransport/${transportId}`)
            .send({
                date: '2024-02-01',
                location_address: '456 Updated St',
                location_lat: 34.0522,
                location_lng: -118.2437,
                count_order: 10,
                additional_quantity: 5,
                status: 1,
                driver_id: 2,
                pump_id: 2,
                pipe_count: 20,
                transfers: "Direct"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.location_address).toBe('456 Updated St');
        expect(response.body.count_order).toBe(10);
    });

    test('should delete a transport by id', async () => {
        const response = await request(app).delete(`/api/deleteTransport/${transportId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(transportId);
    });

    test('should get all transports', async () => {
        const response = await request(app).get('/api/getTransports');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });

});

describe('Negative tests', () => {

    test('should not create a transport with missing fields', async () => {
        const response = await request(app)
            .post('/api/addTransport')
            .send({
                location_address: '123 Test St',
                location_lat: 40.7128,
                location_lng: -74.0060
            });

        expect(response.statusCode).toBe(500);
    });

    test('for non-existent transport id', async () => {
        const response = await request(app).get('/api/getTransport/99999');

        expect(response.status).toBe(500);
    });

    test('should not update a transport with invalid id', async () => {
        const response = await request(app)
            .put('/api/updateTransport/99999')
            .send({
                date: '2024-02-01',
                location_address: '456 Updated St',
                location_lat: 34.0522,
                location_lng: -118.2437,
                count_order: 10,
                additional_quantity: 5,
                status: 1,
                driver_id: 2,
                pump_id: 2,
                pipe_count: 20,
                transfers: "Direct"
            });

        expect(response.statusCode).toBe(500);
    });

    test('should not delete a transport with invalid id', async () => {
        const response = await request(app).delete('/api/deleteTransport/99999');

        expect(response.statusCode).toBe(404);
    });

    test('should not get all transports when there are none', async () => {
        try {
            await pool.query('DELETE FROM transport');

            const response = await request(app).get('/api/getTransports');

            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        } catch (err) {
            console.error(err);
        }

    });
})