const EventEmitter = require('events');
const QueuePublisherService = require('./QueuePublisherService');

describe('QueuePublisherService', () => {
  const queueName = 'queue-name';
  const queueManager = new EventEmitter();
  queueManager.channel = {
    sendToQueue: jest.fn(),
    assertQueue: jest.fn(),
  };

  let service;
  beforeEach(() => {
    service = new QueuePublisherService({queueManager, queueName});
  });

  it('whent not initialized, should not call publish method', () => {
    const input = {
      msg: 'Test',
      type: 'queue',
    };

    service.publish(input);

    expect(queueManager.channel.sendToQueue).not.toBeCalled();
  });

  it('whent initialized, should not call publish method', async () => {
    const input = {
      msg: 'Test',
      type: 'queue',
    };
    await service.init();

    await service.publish(input);

    expect(queueManager.channel.assertQueue).toHaveBeenCalledWith(queueName, {
      durable: false,
    });
    expect(queueManager.channel.sendToQueue).toHaveBeenCalledWith(queueName, Buffer.from(input.msg));
  });
});
