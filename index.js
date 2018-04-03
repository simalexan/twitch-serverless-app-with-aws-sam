'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.putViewers = (event, context, callback) => {
    let { nickname } = JSON.parse(event.body);

    let params = {
        TableName: TABLE_NAME,
        Item: {
            viewersId: uuid(),
            twitchNickName: nickname
        }
    };

    dynamo.put(params).promise()
        .then(response => {
            console.log(response);
            reply(201, response, callback);
        }).catch(err => {
            console.log(err);
            reply(400, err, callback);
        });
};

exports.getViewers = (event, context, callback) => {

    let params = {
        TableName: TABLE_NAME
    };

    dynamo.scan(params).promise()
        .then(response => {
            console.log(response);
            reply(200, response.Items, callback);
        }).catch(err => {
            console.log(err);
            reply(400, err, callback);
        });
};

function reply(statusCode, data, callback){
    callback(null, {
        statusCode: statusCode,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
}