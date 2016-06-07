(function(){
  angular.module('form', ['participants'])
    .component('formComp', {
      templateUrl: 'components/form/template.html',
      controller: function(Participants){
        var ctrl = this;
        ctrl.participant = {};
        ctrl.addParticipant = function(data) {
          console.log(data);
          Participants.addParticipant(data);
        };
        this.items = ['one', 'two', 'three'];
        this.selection = this.items[0];
      }
    });

})();
