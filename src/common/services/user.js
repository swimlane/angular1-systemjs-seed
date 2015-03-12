import angular from 'angular';

class CurrentUser{
  /*@ngInject*/
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

export default angular
  .module('user', [])
  .factory('CurrentUser', CurrentUser);
