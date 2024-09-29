const fastify = require('fastify')({ logger: true });
const { connectRabbitMQ } = require('./services/rabbitmq');
const { sendLogMessage } = require('./services/rabbitmq');
const { logRequest } = require('./controllers/logController');
const config = require('./config');

// Connect to RabbitMQ
connectRabbitMQ();

// Register Swagger
fastify.register(require('@fastify/swagger'), {
  routePrefix: '/swagger',
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'API documentation for Fastify application',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
});

// Register Swagger UI
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/swagger',
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'API documentation for Fastify application',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
});

// Log every request
fastify.addHook('onRequest', logRequest);

// Register routes
fastify.register(require('./routes/index'));
fastify.register(require('./routes/users'), { prefix: '/api' });

// Error handling
fastify.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  sendLogMessage({ error: error.message, stack: error.stack });
  reply.status(500).send('Something broke!');
});

module.exports = fastify;