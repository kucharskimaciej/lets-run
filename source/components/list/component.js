(function(){
  angular.module('usersList', ['participants'])
    .component('usersListComp', {
      templateUrl: 'components/list/template.html',
      bindings: {
        participants: '<',
        limitFrom: '<',
        limit: '<'
      },
      controller: function(Participants){
        console.log(this.limit);
        console.log(this.limitFrom);
      }
    });

})();
