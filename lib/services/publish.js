/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const Sns = require('./sns');

module.exports = class Service extends Sns {
  create (data) {
    return new Promise((resolve, reject) => {
      const publishTextPromise = this.sns.publish(data).promise();
      return publishTextPromise.then(resolve).catch(reject);
    });
  }
};
