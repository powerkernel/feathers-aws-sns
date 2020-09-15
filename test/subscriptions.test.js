/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const AWS = require("aws-sdk-mock");
const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const { Subscriptions } = require("../lib");

let app;

describe("AWS SNS Subscriptions Service", () => {
  beforeAll(() => {
    AWS.mock("SNS", "listSubscriptionsByTopic", {
      ResponseMetadata: { RequestId: "a3bfff2b-d35e-5d5f-b6b9-aa921f619503" },
      Subscriptions: [
        {
          SubscriptionArn:
            "arn:aws:sns:us-east-1:658710424301:MySNSTopic:2702ec54-c896-4b17-927f-b04380f03bf2",
          Owner: "123456789012",
          Protocol: "sms",
          Endpoint: "+13305555555",
          TopicArn: "arn:aws:sns:us-east-1:658710424301:MySNSTopic",
        },
        {
          SubscriptionArn:
            "arn:aws:sns:us-east-1:658710424301:MySNSTopic:7fef06f2-6a02-4453-ba5a-51fc07f1093d",
          Owner: "123456789012",
          Protocol: "email",
          Endpoint: "admin@domain.com",
          TopicArn: "arn:aws:sns:us-east-1:658710424301:MySNSTopic",
        },
      ],
    });

    AWS.mock("SNS", "subscribe", {
      ResponseMetadata: { RequestId: "d69b168e-e8f4-579c-b6f7-433725398e51" },
      SubscriptionArn: "pending confirmation",
    });

    AWS.mock("SNS", "unsubscribe", {
      ResponseMetadata: { RequestId: "361d86ce-a8cf-51bf-b7c5-d3776795f22a" },
    });

    app = express(feathers()).use(
      "/sns/subscriptions",
      new Subscriptions({
        region: "us-east-1",
        accessKey: "your_aws_accessKey",
        secretKey: "your_aws_secretKey",
      })
    );
  });

  afterAll(() => {
    AWS.restore("SNS", "unsubscribe");
    AWS.restore("SNS", "subscribe");
    AWS.restore("SNS", "listSubscriptionsByTopic");
  });

  test("returns a list of the subscriptions to a specific topic.", async () => {
    const result = await app
      .service("sns/subscriptions")
      .get({ TopicArn: "arn:aws:sns:us-east-1:658710424301:MySNSTopic" });
    expect(result).toStrictEqual({
      ResponseMetadata: { RequestId: "a3bfff2b-d35e-5d5f-b6b9-aa921f619503" },
      Subscriptions: [
        {
          SubscriptionArn:
            "arn:aws:sns:us-east-1:658710424301:MySNSTopic:2702ec54-c896-4b17-927f-b04380f03bf2",
          Owner: "123456789012",
          Protocol: "sms",
          Endpoint: "+13305555555",
          TopicArn: "arn:aws:sns:us-east-1:658710424301:MySNSTopic",
        },
        {
          SubscriptionArn:
            "arn:aws:sns:us-east-1:658710424301:MySNSTopic:7fef06f2-6a02-4453-ba5a-51fc07f1093d",
          Owner: "123456789012",
          Protocol: "email",
          Endpoint: "admin@domain.com",
          TopicArn: "arn:aws:sns:us-east-1:658710424301:MySNSTopic",
        },
      ],
    });
  });

  test("prepares to subscribe an endpoint by sending the endpoint a confirmation message", async () => {
    const result = await app.service("sns/subscriptions").create({
      Protocol: "EMAIL",
      TopicArn: "arn:aws:sns:us-east-1:658710424301:MySNSTopic",
      Endpoint: "admin@domain.com",
    });
    expect(result).toStrictEqual({
      ResponseMetadata: { RequestId: "d69b168e-e8f4-579c-b6f7-433725398e51" },
      SubscriptionArn: "pending confirmation",
    });
  });

  test("Deletes a subscription", async () => {
    const result = await app.service("sns/subscriptions").remove({
      SubscriptionArn:
        "arn:aws:sns:us-east-1:658710424301:MySNSTopic:2702ec54-c896-4b17-927f-b04380f03bf2",
    });
    expect(result).toStrictEqual({
      ResponseMetadata: { RequestId: "361d86ce-a8cf-51bf-b7c5-d3776795f22a" },
    });
  });
});
