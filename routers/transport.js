const express = require('express');
const router = express.Router();
const transports_modules = require('../modules/transport');
require('dotenv').config();

router.post('/addTransport', async (req, res) => {
    try {
        const transport = await transports_modules.createTransport(req.body);
        res.status(201).json(transport);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getTransport/:id', async (req, res) => {
    try {
        const transport = await transports_modules.getTransportById(req.params.id);
        if (!transport) {
            res.status(404).json({ error: 'Transport not found' });

        }
        res.status(200).json(transport);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/getTransports', async (req, res) => {
    try {
        const transports = await transports_modules.getTransports();
        res.json(transports);
    } catch (err) {
        console.error('Error fetching transports', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/updateTransport/:id', async (req, res) => {
    try {
        const transport = await transports_modules.updateTransport(req.params.id, req.body);
        if (transport) {
            res.json(transport);
        } else {
            res.status(404).json({ error: 'Transport not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/deleteTransport/:id', async (req, res) => {
    try {
        const transport = await transports_modules.deleteTransport(req.params.id);
        if (transport) {
            res.json(transport);
        } else {
            res.status(404).json({ error: 'Transport not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;