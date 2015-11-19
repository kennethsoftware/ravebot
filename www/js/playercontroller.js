ravebot.controller('PlayerCtrl', ['$scope', '$http', '$state', '$location', '$cookies', '$sce', function($scope, $http, $state, $location, $cookies, $sce) {
  $scope.partyName = $cookies.get('partyName')
  $scope.currentSong = ''
  $scope.songMessage = ''

  $scope.song = true

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.grabSong = function() {
    $http.get('https://stormy-bastion-7671.herokuapp.com/songs/random/' + $scope.partyName, 'GET').then(
      function success(response) {
        $scope.currentSong = 'https://w.soundcloud.com/player/?url=' + response.url + '&auto_play=true'
        $scope.partyName = response.party_name
        $scope.songUser = response.name
        $scope.songMessage = response.message
        setTimeout(function () {
          $state.reload()
        }, response.duration);
      },
      function error() {
        $scope.songPlaying()
      });
  };

  $scope.songPlaying = function() {
    $scope.song = false
    setTimeout(function () {
      $state.reload()
    }, 5000);
  };

}]);
