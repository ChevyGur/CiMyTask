const { pool } = require('../core/config_db');

const createStatusTransport = async (status_id, user_id) => {
  let client;
  try {
    client = await pool.connect();
    console.log("before db query");
    const query = `
      INSERT INTO StatusTransport (status_id, update_time, user_id) 
      VALUES ($1, CURRENT_TIMESTAMP, $2) 
      RETURNING *;
    `;

    const values = [status_id, user_id];
    const res = await client.query(query, values);

    console.log("after db query");
    console.log(res);
    return res.rows[0];
  } catch (err) {
    console.error('Error insert status transport:', err);
    throw err;
  } finally {
    client.release();
  }
};

const getStatusTransportById = async (id) => {
  let client;
  try {
    client = await pool.connect();
    const query = 'SELECT * FROM StatusTransport WHERE transport_status_id = $1';
    const res = await client.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error('Status transport not found');
    }
    return res.rows[0];
  } catch (err) {
    console.error('Error getting status transport by ID:', err);
    throw err;
  } finally {
    client.release();
  }
};

const updateStatusTransport = async (id, status_id, user_id, update_time) => {
  let client;
  try {
    client = await pool.connect();
    const query = `
      UPDATE StatusTransport 
      SET status_id = $1, user_id = $2, update_time = $3
      WHERE transport_status_id = $4 
      RETURNING *;
    `;
    const values = [status_id, user_id, update_time, id];
    const res = await client.query(query, values);
    if (res.rows.length === 0) {
      throw new Error('Status transport not found');
    }
    return res.rows[0];
  } catch (err) {
    console.error('Error updating status transport:', err);
    throw err;
  } finally {
    client.release();
  }
};

const deleteStatusTransport = async (id) => {
  let client;
  try {
    client = await pool.connect();
    const query = 'DELETE FROM StatusTransport WHERE transport_status_id = $1 RETURNING *';
    const res = await client.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error('Status transport not found');
    }
    return { message: 'Record deleted successfully' };
  } catch (err) {
    console.error('Error deleting status transport:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  createStatusTransport,
  getStatusTransportById,
  updateStatusTransport,
  deleteStatusTransport,
};
