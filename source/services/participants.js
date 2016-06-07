(function(){
  angular.module('participants', [])
  .service('Participants', function($rootScope, $http){

    this.getAll = function(){
      return $http.get('/api/participants').success(function(response){
        return response.data;
      });
    };
    
    this.addParticipant = function(data){
      return $http.post('/api/participants', data);
    };
  });
})();
