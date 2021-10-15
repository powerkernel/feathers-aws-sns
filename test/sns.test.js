/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2020 Power Kernel
 */

const Sns = require("../lib/services/sns");

describe("AWS SNS Service", () => {
  describe("Initialization", () => {
    describe("when missing `region` key", () => {
      test("throws an error", () => {
        expect(() => {
          new Sns({});
        }).toThrow("AWS `region` needs to be provided");
      });
    });
    describe("when missing `accessKey` key", () => {
      test("throws an error", () => {
        expect(() => {
          new Sns({ region: "us-east-1a" });
        }).toThrow("AWS `accessKey` needs to be provided");
      });
    });
    describe("when missing `secretKey` key", () => {
      test("throws an error", () => {
        expect(() => {
          new Sns({
            region: "us-east-1",
            accessKey: "some_key",
          });
        }).toThrow("AWS `secretKey` needs to be provided");
      });
    });
    describe("when everything is OK", () => {
      test("create an SNS", () => {
        const service = new Sns({
          region: "us-east-1",
          accessKey: "some_key",
          secretKey: "some_key",
        });
        expect(typeof service).toBe("object");
      });
    });
  });
});
