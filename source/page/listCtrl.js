(function(){
  angular.module('participantsList', ['templates', 'participants'])
    .controller('ParticipantsCtrl', ['$scope', 'Participants', function($scope, Participants){
      this.users = Participants.participants;
      this.participant = {};

      this.addParticipant = function(participant){
        Participants.addParticipant(participant);
        this.participant = {};
      };
    }]);

})();
