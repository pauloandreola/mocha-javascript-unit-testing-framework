var MyClass = require("../src/myClass.js");
var sinon = require("sinon");
var myObj = new MyClass();
var chai = require("chai");
var expect = chai.expect;
const chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);


describe.skip("Test suit for spy and mock", function() {
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
    expectation.withArgs("Hello world");
    myObj.callNewFn();
  });

});

describe.skip("Test suit for stub", function() {
  //  Os testes abaixo devem ser rodados um por vez conforme comentários
  // Este teste vai passar independente dos argumentos se o return for igual ao retorno final
  it("Stub the add method with same result", function() {
    var stub = sinon.stub(myObj, "add");
    stub.withArgs(10, 20).returns(100);
    expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
  });

  // Vai passar com o argumento errado por "to.be.not.equal"
  // it("Stub the add method with not equal args", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 30).returns(100);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.not.equal(100);
  // });

  // Vai não vai passar pois os argumentos não estão iguais
  // it("Stub the add method with not equal args", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 20).returns(100);
  //   expect(myObj.callAnotherFn(10, 30)).to.be.equal(100);
  // });

  //  Vai passar com o resultado diferente por "to.be.not.equal"
  // it("Stub the add method with not equal result", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 30).returns(90);
  //   expect(myObj.callAnotherFn(10, 30)).to.be.not.equal(100);
  // });

  //  Vai passar com o resultado diferente por "to.be.not.equal"
  // it("Stub the add method with not equal result", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 30).returns(100);
  //   expect(myObj.callAnotherFn(10, 30)).to.be.not.equal(90);
  // });

  //  Não vai passar com o resultado diferente por "to.be.equal"
  // it("Stub the add method with not equal result", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 30).returns(90);
  //   expect(myObj.callAnotherFn(10, 30)).to.be.equal(100);
  // });

  //  Não vai passar com o resultado diferente por "to.be.equal"
  // it("Stub the add method with not equal result", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 30).returns(100);
  //   expect(myObj.callAnotherFn(10, 30)).to.be.equal(90);
  // });

  //  Vai passar com o resultado iguais nas suas chamadas por "to.be.equal"
  // it("Stub the add method with equal result with twice call", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 20)
  //   .onFirstCall().returns(100)
  //   .onSecondCall().returns(200);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.equal(200);
  // });

  //  Vai passar com o resultado diferente nas suas chamadas por "to.be.not.equal"
  // it("Stub the add method with equal result with twice call", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 20)
  //   .onFirstCall().returns(100)
  //   .onSecondCall().returns(200);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.not.equal(200);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.not.equal(300);
  // });

    //  Não vai passar com o resultado diferente nas suas chamadas por "to.be.equal"
  // it("Stub the add method with equal result with twice call", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 20)
  //   .onFirstCall().returns(100)
  //   .onSecondCall().returns(200);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.equal(200);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.equal(200);
  // });

  //  Não vai passar com o resultado diferente nas suas chamadas por "to.be.equal"
  // it("Stub the add method with equal result with twice call", function() {
  //   var stub = sinon.stub(myObj, "add");
  //   stub.withArgs(10, 20)
  //   .onFirstCall().returns(100)
  //   .onSecondCall().returns(200);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
  //   expect(myObj.callAnotherFn(10, 20)).to.be.equal(300);
  // });



});

describe.skip("Test the promise", function() {
  it("Promise first test case", function() {
    myObj.testPromise();
  });

  // Vai passar pois o tempo está em 6 e a função testPromise em 6 segundos
  it("Promise second test case", function(done) {
    this.timeout(0);
    myObj.testPromise().then(function(result) {
      expect(result).to.be.equal(6);
      done();
    });
  });

  // Vai passar pois o tempo está em 4 a função testPromise em 6 segundos porém ".to.be.not.equal" 
  it("Promise another second test case", function(done) {
    this.timeout(0);
    myObj.testPromise().then(function(result) {
    expect(result).to.be.not.equal(4);
      done();
    });
  });

  // Não vai passar pois o tempo está em 7 e a função testPromise em 6 segundos
  // it("Promise third test case", function(done) {
  //   this.timeout(0);
  //   myObj.testPromise().then(function(result) {
  //     expect(result).to.be.equal(7);
  //     done();
  //   });
  // });

  // Vai passar pois o tempo está em 6 e a função testPromise em 6 segundos
  it("Promise fourth test case", function() {
    this.timeout(0);
    // myObj.testPromise().then(function(result) {
    //   expect(result).to.be.equal(6);
    //   done();
    // });
    return expect(myObj.testPromise()).to.eventually.equal(6);
  });

  // Não vai passar pois o tempo está em 62 e a função testPromise em 6 segundos
  it("Promise another fourth test case", function() {
    this.timeout(0);
    return expect(myObj.testPromise()).to.eventually.equal(62);
  });

  // Vai passar pois o tempo está em 7 e a função testPromise em 6 segundos porém ".to.be.not.equal"
  it("Promise again another fourth test case", function() {
    this.timeout(0);
    return expect(myObj.testPromise()).to.eventually.not.equal(62);
  });

});

