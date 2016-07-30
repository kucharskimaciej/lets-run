(function(){
  angular.module('app', ['templates', 'participants', 'ui.router', 'ngMessages', 'participantsList', 'ngCookies'])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('participants', {
      url: '/',
      templateUrl: 'page/template.html'
    })

  });
})();
