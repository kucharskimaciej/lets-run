(function(){
  angular.module('form', ['participants'])
    .component('formComp', {
      templateUrl: 'components/formComp/form-temp.html',
      bindings: {
        participants: "<"
      },
      controller: function(Participants, $scope){
        this.addParticipant = function(participant){
          Participants.addParticipant(participant);
          this.participant = {};

          // if (this.participants.length === 20) {
          //   console.log("koniec");
          // }
        };
        $scope.items = ['one', 'two', 'three'];
        $scope.selection = $scope.items[0];
      }
    });

})();
