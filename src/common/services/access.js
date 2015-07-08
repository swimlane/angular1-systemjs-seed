import angular from 'angular';

/*@ngInject*/
function Access($q, PERMISSIONS){
  var user = {
    name: 'Tom',
    permissions: {
      "viewDashboard": false,
      "viewAdmin": true
    }
  };

  return {
    /*
     * Checks whether the current user has permissions to access the route
    */
    canAccessRoute: function(route){
      if (route.access && route.access.permissions){
        // check if the current user has permissions
        if (user.permissions && user.permissions[route.access.permissions] && user.permissions[route.access.permissions] === true){
          return true;
        } else {
          return false;
        }
      } else {
        // route has no access restrictions defined
        return true;
      }
    },

    /*
     * Checks whether the current user has the permission
    */
    hasPermission: function(permission){
      return user.permissions && user.permissions[permission] && user.permissions[permission] === true;
    }
  }
};

var permissions = {
  viewAdmin: "viewAdmin",
  viewDashboard: "viewDashboard"
}

export default angular
  .module('access-module', [])
  .factory('Access', Access)
  .constant('PERMISSIONS', permissions);
