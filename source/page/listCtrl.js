(function(){
  angular.module('participantsList', ['templates', 'participants', 'usersList', 'form', 'ngMessages' ])
    .controller('ParticipantsCtrl', ['Participants', function(Participants){
      var ctrl = this;
      ctrl.hideForm = false;

      Participants.getAll().then(function(response){
        ctrl.participants = response.data;
      });

      ctrl.participant = {};
      ctrl.addParticipant = function(data) {
        Participants.addParticipant(data).then(function(response){
          ctrl.participants.push(response.data);
          console.log(response.data);
          ctrl.hideForm = true;
        });
      };

    }]);

})();
