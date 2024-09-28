"use strict";

const awsSDK = require("aws-sdk");
const AWS = require("aws-sdk-mock");
const expect = require("chai").expect;
const sinon = require("sinon");

const payload = require("../../mocks/event.json");
const context = require("../../mocks/context");

const handler = require("../../../src/hello-world");

describe(`Hello World handler`, function () {
  it(`returns a 200 when it retrives an item from dynamoDB`, async function () {
    AWS.mock("DynamoDB", "getItem", function (params, callback) {
      callback(null, { response: { Item: { data: { S: "data" } } } });
    });

    const response = await handler(payload, context).catch((err) => {
      expect(err).to.be.undefined;
    });

    expect(response).to.have.property("statusCode", 200);

    AWS.restore("DynamoDB", "getItem");
  });

  it(`returns a 400 when it errors retreiving something from dynamoDB`, async function () {
    AWS.mock("DynamoDB", "getItem", function (params, callback) {
      callback(new Error("sinon threw an error"), null);
    });

    const response = await handler(payload, context).catch((err) => {
      expect(err).to.be.undefined;
    });

    expect(response).to.have.property("statusCode", 400);
  });
});
