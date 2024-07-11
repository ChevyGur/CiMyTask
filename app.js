const express = require('express');
const bodyParser = require('body-parser');

const statusRouter = require('./routers/status');
const statusTransportRouter = require('./routers/statusTransport');
const { createStatusTransportTable } = require('./core/config_db');

const app = express();
// create_transports_table();
require('dotenv').config();

createStatusTransportTable();

app.use(express.json());

app.use(bodyParser.json());

app.use('/status-transport', statusTransportRouter);
app.use('/api', statusRouter);

app.get('/', (req, res) => {
  res.send('Hello Transports!');
});

module.exports = app;
