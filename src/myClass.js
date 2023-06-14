class MyClass {
  constructor() {
    console.log("initiate");
  }

  sayHello() {
    console.log("Hello");
  }

  anotherSayHello(str) {
    console.log(str);
  }

  add(arg1, arg2) {
    var result;
    result = arg1 + arg2;
    return result;
  }

  callAnotherFn(arg1, arg2) {
    this.sayHello();
    var result = this.add(arg1, arg2);
    return result;
  }

  callNewFn(arg1, arg2) {
    this.anotherSayHello("Hello world")
    var result = this.add(arg1, arg2);
    return result;
  }

  callTheCallBack(callback) {
    callback();
  }

  testPromise() {
    return new Promise(function(resolve, reject) {
      setTimeout(()=> resolve(3), 6000);
    }).then(function(result) {
      return result * 2;
    })
  }
}

module.exports = MyClass;