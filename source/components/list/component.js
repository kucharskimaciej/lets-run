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
        var ctrl = this;
        this.isCurrentUser = function(participant){
          if (Cookies.isCurrentUser(participant.id)) {
            return true;
          }
        };
        this.removeParticipant = function(participant) {
          Participants.removeParticipant(participant.id).then(function(){
            var index = ctrl.participants.indexOf(participant);
            ctrl.participants.splice(index, 1);
          });
        };
      }
    });

})();
