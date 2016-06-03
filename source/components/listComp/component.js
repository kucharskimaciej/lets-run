(function(){
  angular.module('usersList', ['participants'])
    .component('usersListComp', {
      templateUrl: 'components/listComp/list-template.html',
      controller: function(Participants){
        this.removeParticipant = function(participant) {
          Participants.removeParticipant(participant);
        };
      },
      bindings: {
        participants: '<'
      }
    });

})();
