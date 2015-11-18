describe('HomeCtrl', function() {
  beforeEach(module('ravebot'));

  var response = {'name': 'party', 'id': 1}

  var httpBackend;
  beforeEach(inject(function(_$cookies_, _$httpBackend_, _$rootScope_, _$controller_) {
    $cookies = _$cookies_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('HomeCtrl', {'$rootScope' : $rootScope, '$scope': $scope});
    httpBackend = $httpBackend

    httpBackend
      .when("POST", "https://stormy-bastion-7671.herokuapp.com/partys")
      .respond(response)

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

  it('starts with a function allowing a party to be created', function() {
    expect($scope.createParty('test')).toBeDefined;
  })

  it('creates a party with a unique name', function() {
    $scope.createParty('party');
    httpBackend.flush();
    expect($cookies.get('partyName')).toEqual('party');
  });

  it('creates a party with a unique id', function() {
    $scope.createParty('party');
    httpBackend.flush();
    expect($cookies.get('party_id')).toEqual('1');
  });

  it('allows a user to join an existing party', function() {
    $scope.joinParty('party2');
    expect($cookies.get('partyName')).toEqual('party2')
  });
});
