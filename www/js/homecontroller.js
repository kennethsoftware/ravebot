ravebot.controller('HomeCtrl', ['$scope', '$http', '$state', '$location', '$cookies', function($scope, $http, $state, $location, $cookies) {

  $scope.createParty = function(partyname) {
    var newPartyPost = {'name': partyname}
    $http.post('https://stormy-bastion-7671.herokuapp.com/partys', newPartyPost, 'POST').success(function(response) {
      $cookies.put('partyName', response.name)
      $cookies.put('party_id', response.id)
      $state.go('partyplayer')
    });
  };

  $scope.sendSong = function(sendsongto) {
    $cookies.put('partyName', sendsongto)
    $state.go('setsong')
  };

  $scope.joinParty = function(partyname) {
    $http.get('https://stormy-bastion-7671.herokuapp.com/partys/' +partyname, 'GET').then(
      function success(response) {
        $cookies.put('partyName', response.data.name)
        $cookies.put('party_id', response.data.id)
        console.log($cookies.get('partyName'))
        $state.go('partyplayer')
      },
      function error(response) {
        alert("RAVEBOT HASN'T BEEN INVITED TO THIS PARTY")
        $state.reload()
      });
  }



}]);
