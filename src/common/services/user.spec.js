import angular from 'angular';
import 'angular-mock';
import {currentUserModule} from './user';


describe('CurrentUser', function() {
  beforeEach(angular.mock.module(currentUserModule.name));

  var CurrentUser, scope;

  beforeEach(inject(function($injector) {
    CurrentUser = $injector.get('CurrentUser');
    scope = $injector.get('$rootScope');
  }));

  describe('.get', function() {
    it('has a user', function() {
      var user;
      CurrentUser.get().then(function(data) {
        user = data;
      });
      
      scope.$digest();

      expect(user).toEqual({ name: 'Panda' });
    });
  });

});
