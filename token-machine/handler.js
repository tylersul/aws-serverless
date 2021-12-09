'use strict';

const authorizer = require('./authorizer');

module.exports.hello = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Token was valid.'
      },
    ),
  };

  callback(null, response);
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.generateToken = (event, context, callback) => {
  const token = authorizer.generateToken(event.body);
  console.log(token);

  const response = {
    statusCode: 200,
    body: JSON.stringify({token})
  };

  callback(null, response);
};

module.exports.authorize = (event, token, callback) => {
  try {
    console.log(event.authorizationToken);
    console.log(event.methodArn);

    const policy = authorizer.generatePolicy(even.authorizationToken, event.methodArn);
    callback(null, policy);
  } catch (e) {
    console.log(e.message);
    callback(e.message);
  }
}

