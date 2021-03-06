const fs = require('fs');

/**
 * Logs messages
 */
class LogWriterService {
  /**
   * LogWriterService constructor
   * Creates writable stream to log file
   */
  constructor() {
    this.wstream = fs.createWriteStream('logs/consumer.log', {
      flags: 'a',
    });
  }

  /**
   * Logs message data to file
   * @param {ConsumedMessage} message
   */
  logToFile(message) {
    this.wstream.write(
        `Content: ${message.content}, routingKey: ${message.routingKey}, exchange: ${message.exchange}\n`);
  }
}

module.exports = LogWriterService;
