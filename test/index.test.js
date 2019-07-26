/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const { expect } = require('chai');
const plugin = require('../lib');

describe('feathers-aws-sns', () => {
  it('basic testing', () => {
    expect(typeof plugin).to.equal('object', 'It worked');
  });
});
