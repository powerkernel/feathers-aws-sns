/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2020 Power Kernel
 */

const Sns = require("./sns");

module.exports = class Service extends Sns {
  create(data) {
    return new Promise((resolve, reject) => {
      const createTopicPromise = this.sns.createTopic(data).promise();
      return createTopicPromise.then(resolve).catch(reject);
    });
  }

  find(data) {
    return new Promise((resolve, reject) => {
      const listTopicsPromise = this.sns.listTopics(data).promise();
      return listTopicsPromise.then(resolve).catch(reject);
    });
  }

  remove(data) {
    return new Promise((resolve, reject) => {
      const deleteTopicPromise = this.sns.deleteTopic(data).promise();
      return deleteTopicPromise.then(resolve).catch(reject);
    });
  }

  get(data) {
    return new Promise((resolve, reject) => {
      const getTopicAttribsPromise = this.sns
        .getTopicAttributes(data)
        .promise();
      return getTopicAttribsPromise.then(resolve).catch(reject);
    });
  }

  patch(id, data) {
    data.TopicArn = id;
    return new Promise((resolve, reject) => {
      const setTopicAttribsPromise = this.sns
        .setTopicAttributes(data)
        .promise();
      return setTopicAttribsPromise.then(resolve).catch(reject);
    });
  }
};
