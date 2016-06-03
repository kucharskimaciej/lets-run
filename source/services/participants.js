(function(){
  angular.module('participants', [])
  .service('Participants', function($rootScope){
    this.participants = [
      {
        name: 'Aga',
        id: 1
      },
      {
        name: 'Maciek',
        id: 2
      },
      {
        name: 'Tomson',
        id: 3
      },
      {
        name: 'Marta',
        id: 4
      },
      {
        name: 'Gosia',
        id: 5
      }
    ];
    this.addParticipant = function(participant){
      this.participants.unshift(participant);
    };
    this.removeParticipant = function(participant) {;
      var index = this.participants.indexOf(participant)
      this.participants.splice(index, 1);
    };
  });
})();
