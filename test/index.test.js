/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const Sns = require('../lib');

describe('feathers-aws-sns', () => {
  test('exports expected classes', () => {
    expect(typeof Sns).toBe('function');
  });
});
