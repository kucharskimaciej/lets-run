(function(){
  angular.module('participantsList', ['templates', 'participants', 'usersList', 'form', 'ngMessages' ])
    .controller('ParticipantsCtrl', ['Participants', function(Participants){
      var ctrl = this;
      ctrl.hideForm = false;

      Participants.getAll().then(function(response){
        ctrl.participants = response.data;
        console.log(typeof ctrl.participants[0].id)
      });
      ctrl.limit = "";
      ctrl.participant = {};
      ctrl.addParticipant = function(data) {
        Participants.addParticipant(data).then(function(response){
          ctrl.participants.push(response.data);
          ctrl.hideForm = true;
        });
      };

    }]);

})();
