(function(){
  angular.module('participants', [])
  .service('Participants', function($rootScope, $http){

    this.getAll = function(){
      return $http.get('users.json').success(function(response){
        console.log(response);
        return response.data;
      });
    },

    this.addParticipant = function(participant){
      this.participants.unshift(participant);
    };
    this.removeParticipant = function(participant) {;
      var index = this.participants.indexOf(participant)
      this.participants.splice(index, 1);
    };
  });
})();
