/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const errors = require('@feathersjs/errors');
const AWS = require('aws-sdk');

module.exports = class Service {
  /* istanbul ignore next */
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

    // config
    AWS.config.update({
      accessKeyId: options.accessKey,
      secretAccessKey: options.secretKey,
      region: options.region
    });

    this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  }

  create (data) {
    return new Promise((resolve, reject) => {
      if (typeof data.phoneNumber !== 'string') {
        return reject(new errors.BadRequest('`phoneNumber` must be specified'));
      }

      if (typeof data.message !== 'string') {
        return reject(new errors.BadRequest('`message` must be specified'));
      }

      const params = {
        PhoneNumber: data.phoneNumber,
        Message: data.message
      };

      const publishTextPromise = this.sns.publish(params).promise();
      return publishTextPromise.then(resolve).catch(reject);
    });
  }
};
