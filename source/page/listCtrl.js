(function(){
  angular.module('participantsList', ['templates', 'participants', 'usersList', 'form'])
    .controller('ParticipantsCtrl', ['$scope', 'Participants', function($scope, Participants){
      this.participants = Participants.participants;
    }]);

})();
