# feathers-aws-sns

> Feathers AWS SNS service

## Installation

```
npm install @powerkernel/feathers-aws-sns --save
```

## Documentation

Feathers plugin to use Amazon Simple Notification Service (SNS) 

## Available Services
The following services are supported and map to the appropriate SNS resource:
`Publish`
`Topics`
`Subscriptions`

**This is pretty important!** Since this connects to your AWS account you want to make sure that you don't expose these endpoints via your app unless the user has the appropriate permissions. You can prevent any external access by doing this:
```js
const { Forbidden } = require('@feathersjs/errors');

app.service('/sns/publish').before({
  all: [
    context => {
      if(context.params.provider) {
        throw new Forbidden('You are not allowed to access this');
      }
    }
  ]
});

```


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

Copyright (c) 2020 Power Kernel

Licensed under the [MIT license](LICENSE).
