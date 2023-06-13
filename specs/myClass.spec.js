var MyClass = require("../src/myClass.js");
var sinon = require("sinon");
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

  // Os testes abaixo devem ser rodados individualmente para serem compreendidos
  // Este teste vai rodar com sucesso pois spy roda somente uma vez.
  it("Spy the add method with correct result", function() {
    var spy = sinon.spy(myObj, "add");
    var arg1 = 10, arg2 = 20;
    myObj.callAnotherFn(arg1, arg2);
    sinon.assert.calledOnce(spy);
  });

  // Este teste vai rodar sem sucesso pois deveria ser chamado duas vezes e foi somente uma vez.
  // it("Spy again the add method with correct result", function() {
  //   var spy = sinon.spy(myObj, "add");
  //   var arg1 = 10, arg2 = 20;
  //   myObj.callAnotherFn(arg1, arg2);
  //   sinon.assert.calledTwice(spy);
  // });

  // Este teste vai rodar com sucesso pois está rodando somente uma vez "calledOne"
  // it("Spy the add method with correct result", function() {
  //   var spy = sinon.spy(myObj, "add");
  //   var arg1 = 10, arg2 = 20;
  //   myObj.callAnotherFn(arg1, arg2);
  //   expect(spy.calledOnce).to.be.true;
  //   expect(spy.calledWith(arg1, arg2)).to.be.true;
  // });

  // Este teste vai rodar com sucesso pois apesar de rodar duas vezes "calledTwice" passamos "to.be.not.true"
  // it("Spy the add method with correct result", function() {
  //   var spy = sinon.spy(myObj, "add");
  //   var arg1 = 10, arg2 = 20;
  //   myObj.callAnotherFn(arg1, arg2);
  //   expect(spy.calledTwice).to.be.not.true;
  //   expect(spy.calledWith(arg1, arg2)).to.be.true;
  // });

  // Esse teste vai passar, apesar de não ser uma boa prática, foi somente para testar a chamada.
  // it("Spy the add method with correct result", function() {
  //   var spy = sinon.spy(myObj, "add");
  //   var arg1 = 10, arg2 = 20;
  //   myObj.callAnotherFn(arg1, arg2);
  //   expect(spy.calledWith(10, 20)).to.be.true;
  // });

  // Esse teste vai passar por fazer somente uma chamada
  it("Spy the callback method", function() {
    var callback = sinon.spy();
    myObj.callTheCallBack(callback);
    expect(callback.calledOnce).to.be.true;
  });

  //  Esse teste também vai passar por ser falsa a segunda chamada
  it("Spy the another callback method ", function() {
    var callback = sinon.spy();
    myObj.callTheCallBack(callback);
    expect(callback.calledTwice).to.be.false;
  });

  // Esse teste vai passar a palavra Hello pela segunda vez. A primeira foi na chamada anterior do callAnotherFn
  it("Mock the sayHello method", function() {
    myObj.callAnotherFn();
  });

  // Esse teste não vai passar o Hello novamente. Ele foi ignorado.
  // it("Mock the again sayHello method", function() {
  //   var mock = sinon.mock(myObj);
  //   var expectation = mock.expects("sayHello");
  //   expectation.exactly(1);
  //   myObj.callAnotherFn();
  // });

  // Este teste não vai passar pelo Hello novamente porém passa pelo Hello world
  it("Mock the sayHello and anotherSayHello method", function() {
    var mock = sinon.mock(myObj);
    var expectation = mock.expects("sayHello");
    expectation.exactly(1);
    expectation.withArgs("Hello world")
    myObj.callNewFn();
  });

});