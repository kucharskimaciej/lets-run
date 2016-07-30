(function(){
  angular.module('cookies', ['ngCookies'])
  .service('Cookies', function($cookies){
    this.setCurrentUser = function(id){
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 365);
      $cookies.put('currentUser', id, {expires: expireDate});
    };
    this.isCurrentUser = function(id){
      var currentUserId = $cookies.get('currentUser');
      console.log(id, currentUserId);
      if (id === Number(currentUserId)) {
        return true;
      }
    };
  });
})();
