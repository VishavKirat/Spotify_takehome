'use strict';
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.Add = (event, context, callback) => {
  event.Records.forEach((record) => {
    let name = record.s3.object.key;
    let action = record.eventName
    let date = record.eventTime

    let params = {
      TableName: 'spotify-wmdd-4999',
      Item: {
        Name: name,
        Date: date
      }
    }

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    })
});
};


module.exports.Get = (event, context, callback) => {
      const fetch = (error, data) => callback(null, {
        statusCode: error ? 400 : 200,
        body: error ? error.message : JSON.stringify(data)
    });

    dynamoDb.scan({"TableName": "spotify-wmdd-4999"}).promise()
    .then(res => fetch(null, res))
    .catch(err => fetch(err));
};


module.exports.Search = (event, context, callback) => {
   const params = {
      TableName: "spotify-wmdd-4999",
      Key: {
        Name: event.pathParameters.name
      }
    };

    dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Error Occured.'));
      return;
    });
};


module.exports.Playlist = (event, context, callback) => {
    const info =  JSON.parse(event.body);
    const params = {
      TableName: 'spotify-wmdd-4999-playlist',
      Item: {
        Name: info.Name,
        Playlist: info.Playlist
      }
    };

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    })

    const response = {
      statusCode: 200,
      body: JSON.stringify('Music added to playlist'),
    };
    callback(null, response);
};
