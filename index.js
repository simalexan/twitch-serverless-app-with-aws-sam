'use strict';

exports.handler = (event, context, callback) => {
    console.log(event);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' }
    });
};