// Route Handlers
async function getWelcomeMessage(request, reply) {
  return { message: 'Hello World!' };
}

async function getHealthStatus(request, reply) {
  return { status: 'OK' };
}

async function getReadinessStatus(request, reply) {
  const { status } = request.query;
  if (status === '500') {
    reply.status(500).send({ error: '500', message: 'Internal Server Error' });
  } else {
    return { status: 'ready' };
  }
}

// Route Definitions
async function routes(fastify, options) {
  fastify.get('/', {
    schema: {
      description: 'Get a welcome message',
      tags: ['root'],
      summary: 'Welcome message',
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    handler: getWelcomeMessage
  });

  fastify.get('/health', {
    schema: {
      description: 'Get health status',
      tags: ['status'],
      summary: 'Health status',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' }
          }
        }
      }
    },
    handler: getHealthStatus
  });

  fastify.get('/readiness', {
    schema: {
      description: 'Get readiness status',
      tags: ['status'],
      summary: 'Readiness status',
      querystring: {
        type: 'object',
        properties: {
          status: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' }
          }
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    },
    handler: getReadinessStatus
  });
}

module.exports = routes;