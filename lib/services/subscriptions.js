/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2020 Power Kernel
 */

const Sns = require("./sns");

module.exports = class Service extends Sns {
  create(data) {
    return new Promise((resolve, reject) => {
      const subscribePromise = this.sns.subscribe(data).promise();
      return subscribePromise.then(resolve).catch(reject);
    });
  }

  remove(data) {
    return new Promise((resolve, reject) => {
      const unsubscribePromise = this.sns.unsubscribe(data).promise();
      return unsubscribePromise.then(resolve).catch(reject);
    });
  }

  get(data) {
    return new Promise((resolve, reject) => {
      const subslistPromise = this.sns.listSubscriptionsByTopic(data).promise();
      return subslistPromise.then(resolve).catch(reject);
    });
  }
};
