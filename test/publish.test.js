/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2020 Power Kernel
 */

const AWS = require("aws-sdk-mock");
const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const { Publish } = require("../lib");

let app;

describe("AWS SNS Public Service", () => {
  describe("Sends a message to an Amazon SNS topic or sends a text message (SMS message) directly to a phone number.", () => {
    beforeAll(() => {
      AWS.mock("SNS", "publish", {
        MessageId: "66e03283-c2a3-59f8-9649-6735c33a66fd",
      });

      app = express(feathers()).use(
        "/sns/publish",
        new Publish({
          region: "us-east-1",
          accessKey: "your_aws_accessKey",
          secretKey: "your_aws_secretKey",
        })
      );
    });

    afterAll(() => {
      AWS.restore("SNS");
    });

    test("return a MessageId", async () => {
      const result = await app.service("sns/publish").create({
        PhoneNumber: "+13305513148",
        Message: "Hello World",
      });
      expect(result.MessageId).toBe("66e03283-c2a3-59f8-9649-6735c33a66fd");
    });
  });

  describe("When misconfiguration in `data`", () => {
    test("throws error", async () => {
      await expect(app.service("sns/publish").create({})).rejects.toThrow();
    });
  });
});
