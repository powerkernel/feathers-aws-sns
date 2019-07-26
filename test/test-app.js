/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const sns = require('../lib').sns;

module.exports = function (options) {
  return express(feathers())
    .use('/sns', sns(options));
};
