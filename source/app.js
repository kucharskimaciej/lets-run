(function(){
  angular.module('app', ['templates', 'participants', 'ui.router','participantsList'])

  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('participants', {
      url: '/',
      templateUrl: 'page/template.html'
    })

  });
})();
