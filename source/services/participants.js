(function(){
  angular.module('participants', ['cookies'])
  .service('Participants', function($rootScope, $http, Cookies){
    var that = this;
    this.getAll = function(){
      return $http.get('/api/participants').success(function(response){
        return response.data;
      });
    };

    this.addParticipant = function(data){
      return $http.post('/api/participants', data).success(function(response){
        console.log(response);
        Cookies.setCurrentUser(response.id);
      });
    };
  });
})();
