(function(){
  angular.module('usersList', ['participants'])
    .component('usersListComp', {
      templateUrl: 'components/list/template.html',
      bindings: {
        participants: '<',
        limitFrom: '<',
        limit: '<'
      },
      controller: function(Participants){
      }
    });

})();
