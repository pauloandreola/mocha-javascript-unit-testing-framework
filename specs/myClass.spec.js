var MyClass = require("../src/myClass.js");
var myObj = new MyClass();
var chai = require("chai");
var expect = chai.expect;

describe("Test suit", function() {
  it("Test the add method with wrong result", function() {
    expect(myObj.add(1, 2)).to.be.not.equal(5);
  });

  it("Test the add method with correct result", function() {
    expect(myObj.add(1, 2)).to.be.equal(3);
  });
});