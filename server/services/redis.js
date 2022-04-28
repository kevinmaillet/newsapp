const { createClient } = require('redis');
require('dotenv').config();

const redisClient = async () => {
  const client = await createClient();

  await client.connect();

  return client;
};

module.exports = { redisClient };
