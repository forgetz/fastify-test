const fastifyPlugin = require('fastify-plugin');
const sql = require('mssql');
const config = require('../config');

async function dbConnector(fastify, options) {
  const pool = new sql.ConnectionPool(config.db);
  await pool.connect();
  fastify.decorate('db', pool);
}

module.exports = fastifyPlugin(dbConnector);