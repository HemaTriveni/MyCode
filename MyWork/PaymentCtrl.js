   
var mactApp = require('../Mact');

mactApp.controller('paymentSettCtrl', ['$scope', 'dataFactory', function($scope, dataFactory) {

	$scope.paySetting = true;
	$scope.paySuccess = false;
	$scope.payFailure = false;	

	$scope.savePayment = function() {
		
		var postData = {
			"savePaymentInfo":"" + $scope.paySetting
		};

		dataFactory.savePayment(postData).success(function(data) {
			$scope.payFailure = false;
			$scope.paySuccess = true;
		}).error(function(data) {
			$scope.paySuccess = false;			
			$scope.payFailure = true;
		});
	}

	$scope.closeMsg = function() {
		$scope.paySuccess = false;
		$scope.payFailure = false;
	}


}]);