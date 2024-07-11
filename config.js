require('dotenv').config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

module.exports = {
  db_name,
  db_user,
  db_pass,
  db_host,
  db_port
};
