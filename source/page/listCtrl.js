(function(){
  angular.module('participantsList', ['templates', 'participants', 'usersList', 'form'])
    .controller('ParticipantsCtrl', ['$scope', 'Participants', function($scope, Participants){
      var ctrl = this;
      Participants.getAll().then(function(response){

        ctrl.participants = response.data.participants;

      });


    }]);

})();
