import angular from 'angular';

var userModule = angular.module('user', [])
.factory('CurrentUser', CurrentUser);

class CurrentUser{
  constructor($q){
    this.$q = $q;
  }

  getUser(){
    var deferred = $q.defer();

    deferred.resolve({
      name: 'Panda'
    });

    return deferred.promise;
  }
};

CurrentUser.$inject = ['$q'];

export default userModule;
