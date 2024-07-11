const pool = require('../core/config_db');

async function getStatusList() {
    try {
        const result = await pool.query('SELECT * FROM status');
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function addStatus(description) {
    try {
        const result = await pool.query('INSERT INTO status (description) VALUES ($1) RETURNING *', [description]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
async function updateStatus(id, description) {
    try {
        const result = await pool.query('UPDATE status SET description = $1 WHERE status_id = $2 RETURNING *', [description, id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
async function deleteStatus(id) {
    try {
        const result = await pool.query('DELETE FROM status WHERE status_id = $1 RETURNING *', [id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getStatusList,
    addStatus,
    updateStatus,
    deleteStatus
};
