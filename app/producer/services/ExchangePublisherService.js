const QueueManagerEvent = require('../../structures/QueueManagerEvent');

/**
 * Publishes exchange type messages to AMQP
 */
class ExchangePublisherService {
  /**
   * ExchangePublisherService constructor
   * @param {QueueManager} queueManager
   * @param {string} exchangeName
   * @param {string} exchangeType
   */
  constructor({queueManager, exchangeName, exchangeType}) {
    this.connected = false;
    this.queueManager = queueManager;
    this.queueManager.on(QueueManagerEvent.CHANNEL_CREATED_EVENT, async () => {
      await this.init();
    });

    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
  }

  /**
   * Prepare service before use
   */
  async init() {
    this.channel = this.queueManager.channel;
    await this.channel.assertExchange(this.exchangeName, this.exchangeType, {
      durable: false,
    });
    this.connected = true;
  }

  /**
   * Publishes message to AMQP
   * @param {Message} message
   */
  async publish(message) {
    if (!this.connected || !this.channel) {
      // TODO keep msgs locally until connected
      return;
    }
    await this.channel.publish(this.exchangeName, message.target || '', Buffer.from(message.msg));
  }
}

module.exports = ExchangePublisherService;
