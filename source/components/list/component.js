(function(){
  angular.module('usersList', ['participants', 'cookies'])
    .component('usersListComp', {
      templateUrl: 'components/list/template.html',
      bindings: {
        participants: '<',
        limitFrom: '<',
        limit: '<'
      },
      controller: function(Participants, Cookies){
        this.isCurrentUser = function(participant){
          if (Cookies.isCurrentUser(participant.id)) {
            return true;
          }
        };
      }
    });

})();
