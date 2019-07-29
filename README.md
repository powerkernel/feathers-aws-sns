# feathers-aws-sns

[![Build Status](https://api.travis-ci.com/powerkernel/feathers-aws-sns.svg?branch=master)](https://travis-ci.com/powerkernel/feathers-aws-sns)
[![Maintainability](https://api.codeclimate.com/v1/badges/682c2a1a2e3dd2bc490e/maintainability)](https://codeclimate.com/github/powerkernel/feathers-aws-sns/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/682c2a1a2e3dd2bc490e/test_coverage)](https://codeclimate.com/github/powerkernel/feathers-aws-sns/test_coverage)
[![Dependency Status](https://img.shields.io/david/powerkernel/feathers-aws-sns.svg?style=flat-square)](https://david-dm.org/powerkernel/feathers-aws-sns)
[![Download Status](https://img.shields.io/npm/dm/@powerkernel/feathers-aws-sns.svg?style=flat-square)](https://www.npmjs.com/package/@powerkernel/feathers-aws-sns) 
[![Greenkeeper badge](https://badges.greenkeeper.io/powerkernel/feathers-aws-sns.svg)](https://greenkeeper.io/)

> Feathers AWS SNS service

## Installation

```
npm install @powerkernel/feathers-aws-sns --save
```

## Documentation

Feathers plugin to use Amazon Simple Notification Service (SNS) 

## Todo
`Publish` and `Topics` services are done, `Subscriptions` service will be added in next release.

## Complete Example

Here's an example of a Feathers server that uses `feathers-aws-sns` to send SMS direct to a phone number. 

```js
const feathers = require('@feathersjs/feathers');
const {Publish} = require('@powerkernel/feathers-aws-sns');

// Initialize the application
const app = feathers();

// Initialize the service
const service = new Publish({
    region: 'us-east-1',
    accessKey: 'your_aws_access_key',
    secretKey: 'your_aws_access_secret_key'
  });
app.use('/sns/publish', service);

// Send an SMS
result = await app.service('sns/publish').create({
    PhoneNumber: "+13305555555",
    Message: 'Hello World'
  });
```

## License

Copyright (c) 2019 Power Kernel

Licensed under the [MIT license](LICENSE).
