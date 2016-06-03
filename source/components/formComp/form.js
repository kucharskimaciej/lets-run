(function(){
  angular.module('form', ['participants'])
    .component('formComp', {
      templateUrl: 'components/formComp/form-temp.html',
      bindings: {
        participants: "<"
      },
      controller: function(Participants){
        this.addParticipant = function(participant){
          Participants.addParticipant(participant);
          this.participant = {};
    
        };
      }
    });

})();
