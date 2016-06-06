(function(){
  angular.module('participants', [])
  .service('Participants', function($rootScope){
    this.participants = [
      {
        name: 'Aga',
        id: 1,
        email: 'email1@ol.pl'
      },
      {
        name: 'Maciek',
        id: 2,
        email: 'email2@ol.pl'
      },
      {
        name: 'Tomson',
        id: 3,
        email: 'email3@ol.pl'
      },
      {
        name: 'Marta',
        id: 4,
        email: 'email4@ol.pl'
      },
      {
        name: 'Gosia',
        id: 5,
        email: 'email5@ol.pl'
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
