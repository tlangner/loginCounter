var UsersModel = function () {

  this.defineProperties({
    user: {type: 'string'},
    password: {type: 'string'},
    count: {type: 'int'},
  });


  this.login = function (userName,pswrd){

    var self = this;

    geddy.model.UsersModel.load({user: userName, password: pswrd},
      function loginCallBack(err, usersModel){

        if(!usersModel){
          return {"errCode": -1};
        } else {

          usersModel.count +=1;
          geddy.model.UsersModel.save(usersModel, 
            function(err, result){
              return {"errCode": 1, "count": usersModel.count};
            });

        }

      });
  };


  this.add = function (userName, pswrd) {

    var self = this;

    geddy.model.UsersModel.load({user: userName},   
      function addCallBack (err, usersModel){

        //if user name does not already exist
        if(!usersModel){
          if(userName == "" || userName == null || userName.length > 128){

            return {"errCode": -3};


          } else if (pswrd.length > 128){

            return {"errCode:": -4};

          } else {
            var newUser = geddy.model.UsersModel.create({user: userName, password: pswrd, count: 1});
            geddy.model.UsersModel.save(newUser, 
              function (err, result){
                return {"errCode": 1, "count":1};
              });

          }


        //if user name does already exist  
        } else {

          return {"errCode": -2};

        }
    });


  };


  this.TESTAPI_resetFixture = function(){

    var self = this;

    geddy.model.UsersModel.all(
      function testAPICallBack(err, result){

        console.log(result);

    });

  };


  this.TESTAPI_unitTests = function(callback){

    var self = this;

    var tests = require('../../test/users_model.js');
    var failed = 0;
    var passed = 0;
    for(var testName in tests){
      try{
        tests[testName]();
        passed += 1;
        console.log(testName + ": passed!");
      } catch (exception){
        console.log(testName + ": FAILED!");
        failed +=1;
      }
    }

    responseDict = {};
    responseDict.total = failed + passed;
    responseDict.passed = passed;
    responseDict.failed = failed;
    if(failed == 0){
      responseDict.result = "PASSED ALL TESTS!";
    } else if (failed < (failed + passed)){
      responseDict.result = "SOME TESTS FAILED";
    } else {
      responseDict.result = "ALL TESTS FAILED";
    }
    callback(responseDict);

  };





  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
UsersModel.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
UsersModel.someStaticMethod = function () {
  // Do some other stuff
};
UsersModel.someStaticProperty = 'YYZ';
*/

UsersModel = geddy.model.register('UsersModel', UsersModel);

