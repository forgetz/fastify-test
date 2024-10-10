const config = require('./src/config');

// Initialize Elastic APM as early as possible
const apm = require('elastic-apm-node').start({
  serviceName: config.apm.serviceName,
  secretToken: config.apm.secretToken,
  serverUrl: config.apm.serverUrl,
  environment: config.apm.environment
});

const fastify = require('./src/app');
const { port } = require('./src/config');

const dotenv = require('dotenv');

const env = process.env.ENV || 'sit'; // Default to 'sit' if NODE_ENV is not set
dotenv.config({ path: `.env.${env}` });

fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is running on ${address}`);
});