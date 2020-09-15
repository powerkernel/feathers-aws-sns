/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const AWS = require("aws-sdk");

module.exports = class Service {
  constructor(options = {}) {
    if (!options.region) {
      throw new Error("AWS `region` needs to be provided");
    }

    if (!options.accessKey) {
      throw new Error("AWS `accessKey` needs to be provided");
    }

    if (!options.secretKey) {
      throw new Error("AWS `secretKey` needs to be provided");
    }

    // config
    AWS.config.update({
      accessKeyId: options.accessKey,
      secretAccessKey: options.secretKey,
      region: options.region,
    });

    this.sns = new AWS.SNS({ apiVersion: "2010-03-31" });
  }
};
