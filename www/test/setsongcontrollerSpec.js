describe('SetSongCtrl', function() {
  beforeEach(module('ravebot'));

  var trackSearch = {'name': 'songname', 'url': 'urlofsong'}

  var httpBackend;
  beforeEach(inject(function(_$cookies_, _$httpBackend_, _$rootScope_, _$controller_) {
    $cookies = _$cookies_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('SetSongCtrl', {'$rootScope' : $rootScope, '$scope': $scope});
    httpBackend = $httpBackend

    httpBackend
      .when("POST", "https://stormy-bastion-7671.herokuapp.com/songs")
      .respond('Got that')

    httpBackend
      .when("GET", "http://api.soundcloud.com/tracks")
      .respond(trackSearch)

    httpBackend
      .when("GET", "templates/setsong.html")
      .respond({template: 'setsong'})

    httpBackend
      .when("GET", "templates/partyplayer.html")
      .respond({template: 'partyplayer'})

    httpBackend
      .when("GET", "templates/home.html")
      .respond({template: 'home'})
  }));

  xit('searchs tracks on Soundcloud and adds them to the searchResults array', function() {
    $scope.searchSC('cool song');
    httpBackend.flush();
    expect($scope.searchResults).toEqual(trackSearch);
  });
});
