const { getAsync, setexAsync } = require('../utils/redisClient');

async function getAllUsers(request, reply) {
  const cacheKey = 'allUsers';
  const cachedData = await getAsync(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const result = await request.server.db.request().query('SELECT * FROM Users');
  const data = result.recordset;

  await setexAsync(cacheKey, 3600, JSON.stringify(data)); // Cache for 1 hour
  return data;
}

async function getUserById(request, reply) {
  const { id } = request.params;
  const cacheKey = `user:${id}`;
  const cachedData = await getAsync(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const result = await request.server.db.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Users WHERE id = @id');
  const data = result.recordset[0];

  if (data) {
    await setexAsync(cacheKey, 3600, JSON.stringify(data)); // Cache for 1 hour
  }

  return data;
}
  
async function createUser(request, reply) {
  const { name, email } = request.body;
  await request.server.db.request()
    .input('name', sql.NVarChar, name)
    .input('email', sql.NVarChar, email)
    .query('INSERT INTO Users (name, email) VALUES (@name, @email)');
  reply.code(201).send({ message: 'User created' });
}

async function updateUser(request, reply) {
  const { id } = request.params;
  const { name, email } = request.body;
  await request.server.db.request()
    .input('id', sql.Int, id)
    .input('name', sql.NVarChar, name)
    .input('email', sql.NVarChar, email)
    .query('UPDATE Users SET name = @name, email = @email WHERE id = @id');
  reply.send({ message: 'User updated' });
}

async function deleteUser(request, reply) {
  const { id } = request.params;
  await request.server.db.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Users WHERE id = @id');
  reply.send({ message: 'User deleted' });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};


// // Mock data
// const users = [
//     { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
//   ];
  
//   async function getAllUsers(request, reply) {
//     return users;
//   }
  
//   async function getUserById(request, reply) {
//     const { id } = request.params;
//     const user = users.find(u => u.id === parseInt(id));
//     if (user) {
//       return user;
//     } else {
//       reply.status(404).send({ message: 'User not found' });
//     }
//   }
  
//   async function createUser(request, reply) {
//     const { name, email } = request.body;
//     const newUser = {
//       id: users.length + 1,
//       name,
//       email
//     };
//     users.push(newUser);
//     reply.code(201).send({ message: 'User created', user: newUser });
//   }
  
//   async function updateUser(request, reply) {
//     const { id } = request.params;
//     const { name, email } = request.body;
//     const user = users.find(u => u.id === parseInt(id));
//     if (user) {
//       user.name = name;
//       user.email = email;
//       reply.send({ message: 'User updated', user });
//     } else {
//       reply.status(404).send({ message: 'User not found' });
//     }
//   }
  
//   async function deleteUser(request, reply) {
//     const { id } = request.params;
//     const index = users.findIndex(u => u.id === parseInt(id));
//     if (index !== -1) {
//       users.splice(index, 1);
//       reply.send({ message: 'User deleted' });
//     } else {
//       reply.status(404).send({ message: 'User not found' });
//     }
//   }
  
//   module.exports = {
//     getAllUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser
//   };