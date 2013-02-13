var assert = require('assert')
  , tests
  , UsersModel = geddy.model.UsersModel;

tests = {
  'addTests': function () {
    assert.equal(true, true);
  },

  'addUserTest': function(){
  	var userName = "tlangner";
  	var password = "Bobbob123";
  	UsersModel.add(userName,password,
  		function(result){
  			console.log("addUserTestResult = " + result);
  			assert.equal(result, {"errCode": 1, "count":1})
  		});
  },

  'addDuplicateUser': function(){


    var userName = "travis";
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){

  			console.log("addDuplicateUserTestResult = " + result);
  			assert.equal(result, {"errCode": 1, "count":1})
  		});

  	var userName = "travis";
  	var password = "goodbye";
  	UsersModel.add(userName,password,
  		function(result){
  			assert.equal(result, {"errCode": -2});
  		});

  },

  'addEmptyUser': function(){
  	var userName = "";
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){
  			assert.equal(result, {"errCode": -3});
  		});
  },

  'addNullUser': function(){
  	var userName = null;
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){
  			assert.equal(result, {"errCode": -3});
  		});
  },

  'addTooLongUser': function(){

  	var userName = "";

  	for(var i = 0; i< 128; i++){
  		userName += "u";
  	}
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){
  			assert.equal(result, {"errCode": -3});
  		});
  },
  
  'addTooLongPW': function(){

  	var userName = "evanLayman";
  	var password = "";

  	for(var i = 0; i< 128; i++){
  		password += "p";
  	}

  	UsersModel.add(userName,password,
  		function(result){
  			assert.equal(result, {"errCode": -4});
  		});
  }






};

module.exports = tests;
