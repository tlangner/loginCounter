var assert = require('assert')
  , tests
  , UsersModel = geddy.model.UsersModel;

tests = {

  'addUserTest': function(callBack){
  	var userName = "tlangner";
  	var password = "Bobbob123";
  	UsersModel.add(userName,password,
  		function(result){
  			console.log("addUserTestResult = " + result);

  		  	try{
				assert.deepEqual(result, {"errCode": 1, "count":1});
  				callBack(1);
  			} catch (err){
  				console.log("ERROR = " + err);
  				callBack("addUserTest FAILED; ");
  			}

  		});
  },

  'addDuplicateUser': function(callBack){

    var userName = "travis";
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){

  			console.log("addDuplicateUserTestResult = " + result);

			var userName = "travis";
  			var password = "goodbye";
  			UsersModel.add(userName,password,
  				function(result){

  					try{
  						assert.deepEqual(result, {"errCode": -2});
  						callBack(1);
  					} catch (err){
  						callBack("addDuplicateUserTest FAILED; ");
  					}
  			});
  		});
  },

  'addEmptyUser': function(callBack){
  	var userName = "";
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){
  			try{
  			assert.deepEqual(result, {"errCode": -3});
  				callBack(1);
  			} catch (err){
  				callBack("addEmptyUserTest FAILED; ");
  			}
  		});
  },

  'addNullUser': function(callBack){
  	var userName = null;
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){
  			try{
  			assert.deepEqual(result, {"errCode": -3});
  				callBack(1);
  			} catch (err){
  				callBack("addNullUserTest FAILED; ");
  			}
  		});
  },

  'addTooLongUser': function(callBack){

  	var userName = "";

  	for(var i = 0; i< 129; i++){
  		userName += "u";
  	}
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){
  			try{
  			assert.deepEqual(result, {"errCode": -3});
  				callBack(1);
  			} catch (err){
  				callBack("addTooLongUserTest FAILED; ");
  			}
  		});
  },
  
  'addTooLongPW': function(callBack){

  	var userName = "evanLayman";
  	var password = "";

  	for(var i = 0; i< 129; i++){
  		password += "p";
  	}

  	UsersModel.add(userName,password,
  		function(result){
  			try{
  			assert.deepEqual(result, {"errCode": -4});
  				callBack(1);
  			} catch (err){
  				callBack("addTooLongPasswordTest FAILED; ");
  			}
  		});
  },

  'loginWithNonExistentUser': function(callBack){

  	var userName = "gregory";
  	var password = "hello";


  	UsersModel.login(userName,password,
  		function(result){
  			try{
  				assert.deepEqual(result, {"errCode": -1});
  				callBack(1);
  			} catch (err){
  				callBack("loginWithNonExistentUser FAILED; ");
  			}
  		});
  },

  'loginWithIncorrectPassword': function(callBack){

    var userName = "Dustin";
  	var password = "correctpassword";
  	UsersModel.add(userName,password,
  		function(result){

  			var password2 = "wrongPassword";
  			UsersModel.login(userName,password2,
  				function(result){

  					try{
  						assert.deepEqual(result, {"errCode": -1});
  						callBack(1);
  					} catch (err){
  						callBack("loginWithIncorrectPassword FAILED; ");
  					}
  			});
  		});
  }  


};

module.exports = tests;
