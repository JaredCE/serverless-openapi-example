"use strict";

const expect = require("chai").expect;

const index = require("../../index");

describe(`index`, function () {
  it(`should expose handlers`, function () {
    expect(index).to.have.all.keys("helloWorld");
  });
});
