(function(){
  angular.module('form', ['participants'])
    .component('formComp', {
      templateUrl: 'components/form/template.html',
      bindings: {
        addParticipant: '<'
      },
      controller: function(Participants){
        this.participant = {};
        this.submit = function(participant){
          if (!this.password) {
            delete this.participant.pass;
          }
          if (!this.email) {
            delete this.participant.email;
          }
          this.addParticipant(participant);
        };
      }
    });

})();
