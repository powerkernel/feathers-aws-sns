/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const Base = require('./base');
const errorHandler = require('../error-handler');


module.exports = class Service extends Base {
    create(data, params) {
        if (!data || !data.Message || !data.PhoneNumber) {
            debug('Missing Message or PhoneNumber');
        }
        return this.sns.setSMSAttributes(data).promise().catch(errorHandler);
    }
};