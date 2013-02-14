var assert = require('assert')
  , tests
  , UsersModel = geddy.model.UsersModel;

tests = {
  'addTests': function (callBack) {


  	try{
  		assert.equal(true, true);
  		callBack(1);
  	} catch (err){
  		callBack(0);
  	}
    
  },

  'addUserTest': function(callBack){
  	var userName = "tlangner";
  	var password = "Bobbob123";
  	UsersModel.add(userName,password,
  		function(result){
  			console.log("addUserTestResult = " + result);

  		  	try{
				assert.deepEqual(result, {"errCode": 1, "count":2});
  				callBack(1);
  			} catch (err){
  				console.log("ERROR = " + err);
  				callBack(0);
  			}

  		});
  },

  'addDuplicateUser': function(callBack){

    var userName = "travis";
  	var password = "hello";
  	UsersModel.add(userName,password,
  		function(result){

  			console.log("addDuplicateUserTestResult = " + result);

  			try{
  				assert.deepEqual(result, {"errCode": 1, "count":1})
  				callBack(1);
  			} catch (err){
  				callBack(0);
  			}

			var userName = "travis";
  			var password = "goodbye";
  			UsersModel.add(userName,password,
  				function(result){

  					try{
  						assert.deepEqual(result, {"errCode": -2});
  						callBack(1);
  					} catch (err){
  						callBack(0);
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
  				callBack(0);
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
  				callBack(0);
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
  				callBack(0);
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
  				callBack(0);
  			}
  		});
  }


};

module.exports = tests;
