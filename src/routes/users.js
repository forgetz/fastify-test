const userController = require('../controllers/userController');

async function userRoutes(fastify, options) {
  fastify.get('/users', {
    schema: {
      description: 'Get all users',
      tags: ['users'],
      summary: 'Get all users',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              email: { type: 'string' }
            }
          }
        }
      }
    },
    handler: userController.getAllUsers
  });

  fastify.get('/users/:id', {
    schema: {
      description: 'Get user by ID',
      tags: ['users'],
      summary: 'Get user by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        }
      }
    },
    handler: userController.getUserById
  });

  fastify.post('/users', {
    schema: {
      description: 'Create a new user',
      tags: ['users'],
      summary: 'Create a new user',
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['name', 'email']
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    handler: userController.createUser
  });

  fastify.put('/users/:id', {
    schema: {
      description: 'Update a user',
      tags: ['users'],
      summary: 'Update a user',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['name', 'email']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    handler: userController.updateUser
  });

  fastify.delete('/users/:id', {
    schema: {
      description: 'Delete a user',
      tags: ['users'],
      summary: 'Delete a user',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    handler: userController.deleteUser
  });
}

module.exports = userRoutes;