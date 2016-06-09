(function(){
  angular.module('form', ['participants'])
    .component('formComp', {
      templateUrl: 'components/form/template.html',
      bindings: {
        addParticipant: '&'
      },
      controller: function(Participants){

        this.items = ['brak', 'pass', 'email'];
        this.selection = this.items[0];
      }
    });

})();
