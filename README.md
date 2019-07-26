# feathers-aws-sns

[![Build Status](https://api.travis-ci.com/powerkernel/feathers-aws-sns.svg?branch=master)](https://travis-ci.com/powerkernel/feathers-aws-sns)
[![Code Climate](https://codeclimate.com/github/powerkernel/feathers-aws-sns/badges/gpa.svg)](https://codeclimate.com/github/powerkernel/feathers-aws-sns)
[![Dependency Status](https://img.shields.io/david/powerkernel/feathers-aws-sns.svg?style=flat-square)](https://david-dm.org/powerkernel/feathers-aws-sns)
[![Download Status](https://img.shields.io/npm/dm/@powerkernel/feathers-aws-sns.svg?style=flat-square)](https://www.npmjs.com/package/@powerkernel/feathers-aws-sns) 
[![Greenkeeper badge](https://badges.greenkeeper.io/powerkernel/feathers-aws-sns.svg)](https://greenkeeper.io/)

> Feathers AWS SNS service

## Installation

```
npm install @powerkernel/feathers-aws-sns --save
```

## Documentation

TBD

## Complete Example

Here's an example of a Feathers server that uses `feathers-aws-sns`. 

```js
const feathers = require('@feathersjs/feathers');
const plugin = require('@powerkernel/feathers-aws-sns');

// Initialize the application
const app = feathers();

// Initialize the plugin
app.configure(plugin());
```

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).
