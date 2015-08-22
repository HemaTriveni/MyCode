       var mactApp = require('../Mact');

mactApp.controller('accountPwdCtrl', ['$scope', 'dataFactory', function($scope, dataFactory) {

	$scope.passSuccess = false;
	$scope.passFailure = false;

	dataFactory.accountSettings().success(function(data) {
		$scope.accountSettings = data;
	});

	$scope.savePassword = function() {
		var postData = {
			"currentPassword":"" + $scope.currentPassword,			
			"newPassword":"" + $scope.newPassword,
			"reenterPassword":"" + $scope.reenterPassword
		};

		dataFactory.savePassword(postData).success(function(data) {
			$scope.passFailure = false;
			$scope.passSuccess = true;

			$scope.currentPassword = '';
			$scope.newPassword = '';
			$scope.reenterPassword = '';

		}).error(function(data) {
			$scope.passSuccess = false;			
			$scope.passFailure = true;
		});
	}

	$scope.closeMsg = function() {
		$scope.passSuccess = false;
		$scope.passFailure = false;
	}

}]);