/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const errors = require('@feathersjs/errors');
const AWS = require('aws-sdk');

class Service {
  constructor (options = {}) {
    if (!options.region) {
      throw new Error('AWS `region` needs to be provided');
    }

    if (!options.accessKey) {
      throw new Error('AWS `accessKey` needs to be provided');
    }

    if (!options.secretKey) {
      throw new Error('AWS `secretKey` needs to be provided');
    }

    this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  }
  create (data) {
    return new Promise((resolve, reject) => {
      if (!data.PhoneNumber) {
        return reject(new errors.BadRequest('`phoneNumber` must be specified'));
      }

      if (!data.Message) {
        return reject(new errors.BadRequest('`message` must be specified'));
      }

      const params = {
        Message: data.Message,
        PhoneNumber: data.PhoneNumber
      };

      const publishTextPromise = this.sns.publish(params).promise();
      return publishTextPromise.then(resolve).catch(reject);
    });
  }
}

module.exports = options => new Service(options);

module.exports.Service = Service;
