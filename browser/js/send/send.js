app.config(function ($stateProvider) {

    // Register our *send* state.
    $stateProvider.state('send', {
        url: '/send/:id',
        controller: 'SendController',
        templateUrl: 'js/send/send.html'
    });

});

app.controller('SendController', function ($scope, $stateParams, MailFactory, ImageFactory) {
	$scope.firstFriend;
	$scope.secondFriend;
	$scope.thirdFriend;
	$scope.yourEmail;

	console.log("STATE PARAMS IMAGE ID:,", $stateParams.id);

	$scope.send = function() {
		var emails = [$scope.firstFriend, $scope.secondFriend, $scope.thirdFriend];
		var sendObj = {
			email: emails,
			id: $stateParams.id,
			subject: "Your Friend Took A Selfie!"
		}
		ImageFactory.addEmail($stateParams.id, $scope.yourEmail)
		.then(function() {
			MailFactory.sendMail(sendObj);
		})
	}
});

app.factory('MailFactory', function ($http) {
 return {
    sendMail: function (data) {
      console.log("Factory")
          return $http.post('/api/email', data)
    }
  }
});
