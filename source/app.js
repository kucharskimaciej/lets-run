(function(){
  angular.module('app', ['templates', 'participants', 'ui.router','participantsList'])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('participants', {
      url: '/',
      templateUrl: 'page/template.html'
    })

  });
})();
