const express = require('express');
const {
  createStatusTransport,
  getStatusTransportById,
  updateStatusTransport,
  deleteStatusTransport,
} = require('../modules/statusTransport');

const router = express.Router();

router.post('/', async (req, res) => {
  const { status_id, user_id } = req.body;
  try {
    const result = await createStatusTransport(status_id, user_id);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error creating status transport' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getStatusTransportById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error getting status transport by ID' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status_id, user_id, update_time } = req.body;
  try {
    const result = await updateStatusTransport(id, status_id, user_id, update_time);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status transport' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteStatusTransport(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error deleting status transport' });
  }
});

module.exports = router;
