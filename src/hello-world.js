"use strict";

const AWS = require("aws-sdk");

module.exports = async (event, context) => {
  try {
    const dynamoDB = new AWS.DynamoDB({ region: "eu-west-1" });
    const data = await dynamoDB.getItem({ TableName: "", Key: {} }).promise();

    delete data.ConsumedCapacity;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err?.message, errors: err }),
    };
  }
};
