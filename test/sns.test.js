/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

const AWS = require('aws-sdk-mock');
const Sns = require('../lib');

let app;
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

describe('AWS SNS Service', () => {
  describe('Initialization', () => {
    describe('when missing `region` key', () => {
      test('throws an error', () => {
        expect(() => {
          /* eslint-disable no-new */
          new Sns({});
        }
        ).toThrow('AWS `region` needs to be provided');
      });
    });

    describe('when missing `accessKey` key', () => {
      test('throws an error', () => {
        expect(() => {
          /* eslint-disable no-new */
          new Sns({ region: 'us-east-1a' });
        }
        ).toThrow('AWS `accessKey` needs to be provided');
      });
    });
    describe('when missing `secretKey` key', () => {
      test('throws an error', () => {
        expect(() => {
          /* eslint-disable no-new */
          new Sns({
            region: 'us-east-1',
            accessKey: 'some_key'
          });
        }).toThrow('AWS `secretKey` needs to be provided');
      });
    });
    describe('when everything is OK', () => {
      test('create an SNS', () => {
        const service = new Sns({
          region: 'us-east-1',
          accessKey: 'some_key',
          secretKey: 'some_key'
        });
        expect(
          typeof service
        ).toBe('object');
      });
    });
  });

  describe('Sending SMS', () => {
    beforeAll(() => {
      AWS.mock('SNS', 'publish', {
        ResponseMetadata: { RequestId: '67e3d36a-8f9c-5dc7-8918-86dc8e0582c2' },
        MessageId: '66e03283-c2a3-59f8-9649-6735c33a66fd'
      });

      app = express(feathers())
        .use('/sns', new Sns({
          region: 'us-east-1',
          accessKey: 'some_key',
          secretKey: 'some_key'
        }));
    });

    afterAll(() => {
      AWS.restore('SNS');
    });

    describe('when missing `phoneNumber` key', () => {
      test('throws an error', async () => {
        try {
          await app.service('sns').create({});
          expect(true).toBe(false);
        } catch (e) {
          expect(e.message).toBe('`phoneNumber` must be specified');
        }
      });
    });

    describe('when missing `Message` key', () => {
      test('throws an error', async () => {
        try {
          await app.service('sns').create({ phoneNumber: '+13305513148' });
          expect(true).toBe(false);
        } catch (e) {
          expect(e.message).toBe('`message` must be specified');
        }
      });
    });

    describe('send a message', () => {
      test('return a message ID', async () => {
        try {
          const result = await app.service('sns').create({
            phoneNumber: '+13305513148',
            message: 'Hello World'
          });
          expect(result.MessageId).toBe('66e03283-c2a3-59f8-9649-6735c33a66fd');
          expect(result.ResponseMetadata).toBe({ RequestId: '67e3d36a-8f9c-5dc7-8918-86dc8e0582c2' });
        } catch (e) {
          expect.anything(e.message);
        }
      });
    });
  });
});
