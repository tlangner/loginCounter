var UsersModels = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];


  this.add = function(req, resp, params){

    var self = this;

    geddy.model.UsersModel.add(params.user, params.password, 
      function addCallBack(err, result){

        self.respond(result);

      });
    
  };

  this.login = function(req, resp, params){

    var self = this;

    geddy.model.UsersModel.login(params.user, params.password,
      function loginCallBack(err, result){

        self.respond(result);

      });
  };

  this.TESTAPI_resetFixture = function(){

    var self = this;

    geddy.model.UsersModel.TESTAPI_resetFixture(
      function TESTAPI_resetFixtureCallBack(err, result){

        self.respond(result);

      });
  };

  this.TESTAPI_unitTests = function(){

    var self = this;

    geddy.model.UsersModel.TESTAPI_unitTests(
      function(result){
        self.response(result);
      });
  }



  // this.index = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.all(function(err, usersModels) {
  //     self.respond({params: params, usersModels: usersModels});
  //   });
  // };

  // this.add = function (req, resp, params) {
  //   this.respond({params: params});
  // };

  // this.create = function (req, resp, params) {
  //   params.id = params.id || geddy.string.uuid(10);

  //   var self = this
  //     , usersModel = geddy.model.UsersModel.create(params);

  //   usersModel.save(function(err, data) {
  //     if (err) {
  //       params.errors = err;
  //       self.transfer('add');
  //     } else {
  //       self.redirect({controller: self.name});
  //     }
  //   });
  // };

  // this.show = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.first(params.id, function(err, usersModel) {
  //     self.respond({params: params, usersModel: usersModel.toObj()});
  //   });
  // };

  // this.edit = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.first(params.id, function(err, usersModel) {
  //     self.respond({params: params, usersModel: usersModel});
  //   });
  // };

  // this.update = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.first(params.id, function(err, usersModel) {
  //     usersModel.updateProperties(params);

  //     usersModel.save(function(err, data) {
  //       if (err) {
  //         params.errors = err;
  //         self.transfer('edit');
  //       } else {
  //         self.redirect({controller: self.name});
  //       }
  //     });
  //   });
  // };

  // this.destroy = function (req, resp, params) {
  //   var self = this;

  //   geddy.model.UsersModel.remove(params.id, function(err) {
  //     if (err) {
  //       params.errors = err;
  //       self.transfer('edit');
  //     } else {
  //       self.redirect({controller: self.name});
  //     }
  //   });
  // };

};

exports.UsersModels = UsersModels;
