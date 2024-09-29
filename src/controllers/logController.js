const { sendLogMessage } = require('../services/rabbitmq');

async function logRequest(request, reply) {
  const logMessage = {
    method: request.method,
    url: request.url,
    headers: request.headers,
    timestamp: new Date().toISOString()
  };
  request.log.info(logMessage);
  sendLogMessage(logMessage);
}

module.exports = {
  logRequest
};