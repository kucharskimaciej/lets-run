(function(){
  angular.module('usersList', [])
    .component('usersListComp', {
      templateUrl: 'components/listComp/list-template.html',
      controller: function(){
        this.removeParticipant = function(participant) {
          Participants.removeParticipant(participant);
        };
      },
      bindings: {
        participants: '<'
      }
    });

})();
