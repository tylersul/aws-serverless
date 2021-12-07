'use strict';

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'bingbong';

module.exports.generateToken = jsonToSign => {
    // sign with default HMAC SHA256
    var token = jwt.sign(jsonToSign, SECRET_KEY);
    console.log(token);
    return token;
}

module.exports.decodeToken = token => {
    try {
        var decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        return decoded;
    } catch (e) {
        console.log(e);
        return null;
    }
}


module.exports.generatePolicy = (token, methodArn) => {
    if (this.decodeToken(token) != null) {
        console.log('We\'re live.');
        return generatePolicy('user', 'Allow', methodArn);
    } else {
        // Token not decoded correctly
        console.log('We are decidedly not live.');
        const error = new Error('Unauthorized.');
        throw error;
    }
}

const generatePolicy = function(principalId, effect, resource) {
    let authResponse = {};
    authResponse.principalId = principalId;

    if (effect && resource) {
        let policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];

        let statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;

        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }

    return authResponse;
};