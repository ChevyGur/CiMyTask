const { pool } = require("../core/config_db");

const createTransport = async (transport) => {
    let client;
    try {
        client = await pool.connect();
        const query = `
            INSERT INTO Transport (date, location_address, location_lat, location_lng, count_order, additional_quantity, status, driver_id, pump_id, pipe_count, transfers)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *`;
        const values = [transport.date, transport.location_address, transport.location_lat, transport.location_lng, transport.count_order, transport.additional_quantity, transport.status, transport.driver_id, transport.pump_id, transport.pipe_count, transport.transfers]
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.log('Error executing query', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
};


const getTransportById = async (id) => {
    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM Transport WHERE id = $1';
        const res = await client.query(query, [id]);
        return res.rows[0];
    } catch (error) {
        console.log('Error executing query', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
};


const getTransports = async () => {
    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM Transport';
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
};


const updateTransport = async (id, transport) => {
    let client;
    try {
        client = await pool.connect();
        const query = `
            UPDATE Transport
            SET date = $1, location_address = $2, location_lat = $3, location_lng = $4, count_order = $5, additional_quantity = $6, status = $7, driver_id = $8, pump_id = $9, pipe_count = $10, transfers = $11
            WHERE id = $12
            RETURNING *`;
        const values = [transport.date, transport.location_address, transport.location_lat, transport.location_lng, transport.count_order, transport.additional_quantity, transport.status, transport.driver_id, transport.pump_id, transport.pipe_count, transport.transfers, id];
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.log('Error executing query', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }

};

const deleteTransport = async (id) => {
    let client;
    try {
        client = await pool.connect();
        const query = 'DELETE FROM Transport WHERE id = $1 RETURNING *';
        const res = await client.query(query, [id]);
        return res.rows[0];
    } catch (err) {
        console.log('Error executing query', err);
    } finally {
        if (client) {
            client.release();
        }
    }
};

module.exports = {
    createTransport,
    getTransportById,
    updateTransport,
    deleteTransport,
    getTransports
};


