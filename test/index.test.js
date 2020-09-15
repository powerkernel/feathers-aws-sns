/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2020 Power Kernel
 */

const sns = require("../lib");

const CLASSES = ["Publish", "Topics", "Subscriptions"];

describe("feathers-aws-sns", () => {
  test("exports expected classes", () => {
    CLASSES.forEach((name) => {
      expect(typeof sns[name]).toBe("function");
    });
  });
});
