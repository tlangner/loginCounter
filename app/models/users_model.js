var UsersModel = function () {

  this.defineProperties({
    username: {type: 'string'},
    password: {type: 'string'},
    count: {type: 'int'},
  });


  this.login = function (userName,pswrd, callback){

    var self = this;

    geddy.model.UsersModel.load({username: userName, password: pswrd},
      function loginCallBack(err, usersModel){

        if(!usersModel){
          console.log("user does not exist");
          callback({"errCode": -1});
        } else {

          usersModel.count +=1;

          geddy.model.UsersModel.save(usersModel, 
            function(err, result){
              callback({"errCode": 1, "count": usersModel.count});
            });

        }

      });
  };


  this.add = function (userName, pswrd, callback) {

    console.log("reached add function in model");

    var self = this;


    if(userName == null){
      console.log("USERNAME IS NULL");
    }

    if((userName == "") || 
      (userName == null) || 
      (userName.length > 128)){

      callback({"errCode": -3});

    } else if(pswrd.length > 128){
      
      callback({"errCode": -4});

    } else {


      geddy.model.UsersModel.load({username: userName},   
        function addCallBack (err,usersModel){

          //if user name does not already exist
          if(!usersModel){

            var newUser = geddy.model.UsersModel.create({username: userName, password: pswrd, count: 1});
            geddy.model.UsersModel.save(newUser, 
              function (err, result){
                callback ({"errCode": 1, "count":1});
              });

          //if user name does already exist  
          } else {

            callback({"errCode": -2});

          }
      });
    }

  };


  this.TESTAPI_resetFixture = function(callback){

    var self = this;

    geddy.model.UsersModel.all(
      function testAPICallBack(err, allUsers){

        //allUsers is list of users (dictionaries)

        for(var index in allUsers){

          singleUser = allUsers[index];

          geddy.model.UsersModel.remove(singleUser.id);

        }

        callback();

    });

  };


  this.TESTAPI_unitTests = function(callback){


    this.TESTAPI_resetFixture(function(){

      var self = this;

      var tests = require('../../test/users_model.js');
      var failed = 0;
      var passed = 0;
      var totalTests = 0;
      for (var index in tests){
        totalTests++;
      }

      var outputString = "";

      //1 indicates pass, otherwise failed string goes in output
      function counterCallBack (passFail){

        if(passFail == 1){
          passed++;
        } else {
          failed++;
          outputString += passFail;
        }

        if((failed + passed) == totalTests){

          responseDict = {};
          responseDict.totalTests = totalTests;
          responseDict.nrFailed = failed;
          if(passed == totalTests){
            responseDict.output = "all tests passed!";
          } else {
            responseDict.output = outputString;
          }

          callback(responseDict);
        }

      };
      //recursiveTester = function(callBack)

      for(var testName in tests){
          tests[testName](counterCallBack);
      }

    });

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

