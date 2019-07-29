/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const AWS = require('aws-sdk-mock');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const { Topics } = require('../lib');

let app;

describe('AWS SNS Topics Service', () => {
  beforeAll(() => {
    AWS.mock('SNS', 'listTopics', {
      ResponseMetadata: { RequestId: '875981db-e18d-5c2f-b4f1-d4636a54d582' },
      Topics:
        [{ TopicArn: 'arn:aws:sns:us-east-1:658710424301:MySNSTopic' }]
    });
    AWS.mock('SNS', 'createTopic', {
      ResponseMetadata: { RequestId: '70640b4c-2564-548c-9a37-5ef4a9045acb' },
      TopicArn: 'arn:aws:sns:us-east-1:658710424301:MyTopic'
    });
    AWS.mock('SNS', 'deleteTopic', { ResponseMetadata: { RequestId: '95430101-9554-5d24-9abf-54b913bc3d8c' } });
    AWS.mock('SNS', 'getTopicAttributes', {
      ResponseMetadata: { RequestId: '72a4a38d-0c4d-527b-8ed3-f6358b8b5147' },
      Attributes:
        {
          Policy:
            '{"Version":"2008-10-17","Id":"__default_policy_ID","Statement":[{"Sid":"__default_statement_ID","Effect":"Allow","Principal":{"AWS":"*"},"Action":["SNS:GetTopicAttributes","SNS:SetTopicAttributes","SNS:AddPermission","SNS:RemovePermission","SNS:DeleteTopic","SNS:Subscribe","SNS:ListSubscriptionsByTopic","SNS:Publish","SNS:Receive"],"Resource":"arn:aws:sns:us-east-1:658710424301:MySNSTopic","Condition":{"StringEquals":{"AWS:SourceOwner":"123455678909"}}}]}',
          ApplicationSuccessFeedbackSampleRate: '100',
          LambdaSuccessFeedbackSampleRate: '100',
          Owner: '123455678909',
          SubscriptionsPending: '0',
          TopicArn: 'arn:aws:sns:us-east-1:658710424301:MySNSTopic',
          EffectiveDeliveryPolicy:
            '{"http":{"defaultHealthyRetryPolicy":{"minDelayTarget":20,"maxDelayTarget":20,"numRetries":3,"numMaxDelayRetries":0,"numNoDelayRetries":0,"numMinDelayRetries":0,"backoffFunction":"linear"},"disableSubscriptionOverrides":false}}',
          SubscriptionsConfirmed: '3',
          DisplayName: 'My SNS Topic',
          SQSSuccessFeedbackSampleRate: '100',
          HTTPSuccessFeedbackSampleRate: '100',
          SubscriptionsDeleted: '0'
        }
    });
    AWS.mock('SNS', 'setTopicAttributes', { ResponseMetadata: { RequestId: '807fddda-5864-5a19-872c-8862d28696a7' } });

    app = express(feathers())
      .use('/sns/topics', new Topics({
        region: 'us-east-1',
        accessKey: 'your_aws_accessKey',
        secretKey: 'your_aws_secretKey'
      }));
  });

  afterAll(() => {
    AWS.restore('SNS', 'listTopics');
    AWS.restore('SNS', 'createTopic');
    AWS.restore('SNS', 'deleteTopic');
    AWS.restore('SNS', 'getTopicAttributes');
    AWS.restore('SNS', 'setTopicAttributes');
  });

  test('creates a topic to which notifications can be published', async () => {
    const result = await app.service('sns/topics').create({ Name: 'MyTopic' });
    expect(result).toStrictEqual({
      ResponseMetadata: { RequestId: '70640b4c-2564-548c-9a37-5ef4a9045acb' },
      TopicArn: 'arn:aws:sns:us-east-1:658710424301:MyTopic'
    });
  });

  test('returns a list of the requester\'s topics', async () => {
    const result = await app.service('sns/topics').find({});
    expect(result).toStrictEqual({
      ResponseMetadata: { RequestId: '875981db-e18d-5c2f-b4f1-d4636a54d582' },
      Topics:
        [{ TopicArn: 'arn:aws:sns:us-east-1:658710424301:MySNSTopic' }]
    });
  });

  test('deletes a topic and all its subscriptions', async () => {
    const result = await app.service('sns/topics').remove({ TopicArn: 'arn:aws:sns:us-east-1:658710424301:MyTopic' });
    expect(result).toStrictEqual({ ResponseMetadata: { RequestId: '95430101-9554-5d24-9abf-54b913bc3d8c' } });
  });

  test('returns all of the properties of a topic', async () => {
    const result = await app.service('sns/topics').get({ TopicArn: 'arn:aws:sns:us-east-1:658710424301:MySNSTopic' });
    expect(result).toStrictEqual({
      ResponseMetadata: { RequestId: '72a4a38d-0c4d-527b-8ed3-f6358b8b5147' },
      Attributes:
        {
          Policy:
            '{"Version":"2008-10-17","Id":"__default_policy_ID","Statement":[{"Sid":"__default_statement_ID","Effect":"Allow","Principal":{"AWS":"*"},"Action":["SNS:GetTopicAttributes","SNS:SetTopicAttributes","SNS:AddPermission","SNS:RemovePermission","SNS:DeleteTopic","SNS:Subscribe","SNS:ListSubscriptionsByTopic","SNS:Publish","SNS:Receive"],"Resource":"arn:aws:sns:us-east-1:658710424301:MySNSTopic","Condition":{"StringEquals":{"AWS:SourceOwner":"123455678909"}}}]}',
          ApplicationSuccessFeedbackSampleRate: '100',
          LambdaSuccessFeedbackSampleRate: '100',
          Owner: '123455678909',
          SubscriptionsPending: '0',
          TopicArn: 'arn:aws:sns:us-east-1:658710424301:MySNSTopic',
          EffectiveDeliveryPolicy:
            '{"http":{"defaultHealthyRetryPolicy":{"minDelayTarget":20,"maxDelayTarget":20,"numRetries":3,"numMaxDelayRetries":0,"numNoDelayRetries":0,"numMinDelayRetries":0,"backoffFunction":"linear"},"disableSubscriptionOverrides":false}}',
          SubscriptionsConfirmed: '3',
          DisplayName: 'My SNS Topic',
          SQSSuccessFeedbackSampleRate: '100',
          HTTPSuccessFeedbackSampleRate: '100',
          SubscriptionsDeleted: '0'
        }
    });
  });

  test('allows a topic owner to set an attribute of the topic to a new value', async () => {
    const topicArn = 'arn:aws:sns:us-east-1:658710424301:MySNSTopic';
    const data = {
      AttributeName: 'DisplayName',
      AttributeValue: 'MyNewTopic'
    };
    const result = await app.service('sns/topics').patch(topicArn, data);
    expect(result).toStrictEqual({ ResponseMetadata: { RequestId: '807fddda-5864-5a19-872c-8862d28696a7' } });
  });
});
