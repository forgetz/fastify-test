const amqp = require('amqplib');
const { rabbitmqUrl, queue } = require('../config');

let channel;

async function connectRabbitMQ() {
  console.log('connectRabbitMQ');
  // try {
  //   const connection = await amqp.connect(rabbitmqUrl);
  //   channel = await connection.createChannel();
  //   await channel.assertQueue(queue, { durable: true });
  // } catch (err) {
  //   console.error('Failed to connect to RabbitMQ', err);
  //   //process.exit(1);
  // }
}

function sendLogMessage(message) {
  console.log(`send message to rabbitmq`);
  //if (channel) {
    //channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  //}
}

module.exports = {
  connectRabbitMQ,
  sendLogMessage
};