(function(){
  angular.module('form', ['participants'])
    .component('formComp', {
      templateUrl: 'components/form/template.html',
      bindings: {
        participants: "<"
      },
      controller: function(Participants){
        this.addParticipant = function(participant){
          Participants.addParticipant(participant);
          this.participant = {};

          // if (this.participants.length === 20) {
          //   console.log("koniec");
          // }
        };
        this.items = ['one', 'two', 'three'];
        this.selection = this.items[0];
      }
    });

})();
