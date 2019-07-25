/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const AWS = require('aws-sdk');

module.exports = class BaseService {
    constructor(options = {}) {
        if (!options.awsRegion) {
            throw new Error('AWS `AWS Region` needs to be provided');
        }
        if (!options.awsAccessKey) {
            throw new Error('AWS `AWS Access Key` needs to be provided');
        }
        if (!options.awsSecretKey) {
            throw new Error('AWS `AWS Secret Key` needs to be provided');
        }

        AWS.config.update({region: options.awsRegion});
        this.sns = new AWS.SNS({apiVersion: '2010-03-31'});
    }
};