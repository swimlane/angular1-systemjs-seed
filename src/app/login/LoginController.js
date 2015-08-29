export class LoginController{

  /*@ngInject*/
  constructor($scope){
    $scope.loggedin = false;

    $scope.$watch('theme', function(newVal, oldVal, ev){
      if(!newVal) return;
      System.import('assets/' + newVal + '.css!').then(loaded => {
          angular.element(document.body).addClass(newVal);
      });
    });
  }

}
