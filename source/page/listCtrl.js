(function(){
  angular.module('participantsList', ['templates', 'participants', 'usersList', 'form'])
    .controller('ParticipantsCtrl', ['Participants', function( Participants){
      var ctrl = this;


      Participants.getAll().then(function(response){
        ctrl.participants = response.data;
      });




    }]);

})();
