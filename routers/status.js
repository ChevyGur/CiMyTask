const express = require('express');
const router = express.Router();
const statusModule = require('../modules/status');

router.get('/status', async (req, res) => {
  try {
    const statuses = await statusModule.getStatusList();
    res.json(statuses);
  } catch (error) {
    console.error('Error getting statuses:', error);
    res.status(500).json({ error: 'Error getting statuses' });
  }
});



router.post('/status', async (req, res) => {
    try {
        const { description } = req.body;
        const newStatus = await statusModule.addStatus(description);
        res.status(201).json(newStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/status/:id', async (req, res) => {
    try {
        const updatedStatus = await statusModule.updateStatus(req.params.id, req.body.description);
        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/status/:id', async (req, res) => {
    try {
        const deletedStatus = await statusModule.deleteStatus(req.params.id);
        res.status(200).json(deletedStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
