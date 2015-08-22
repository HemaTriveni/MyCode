var mactApp = require('../Mact');

mactApp.controller('accOverviewCtrl', ['$scope', 'dataFactory', function($scope, dataFactory) {

	$scope.settingsSetup = false;

	dataFactory.accountSettings().success(function(data) {
		$scope.accountSettings = data;
		$scope.settingsSetup = true;

		//data needed for the edit forms
		//Shipping Data
		$scope.shipFirstName = $scope.accountSettings.shippingAddress.firstName;
		$scope.shipLastName = $scope.accountSettings.shippingAddress.lastName;
		$scope.shipLineOne = $scope.accountSettings.shippingAddress.lineOne;
		$scope.shipLineTwo = $scope.accountSettings.shippingAddress.lineTwo;
		$scope.shipCity = $scope.accountSettings.shippingAddress.city;
		$scope.shipState = $scope.accountSettings.shippingAddress.state;						
		$scope.shipZip = $scope.accountSettings.shippingAddress.postalCode;
		$scope.shipCountry = $scope.accountSettings.shippingAddress.countryCode;
		$scope.shipLocType = $scope.accountSettings.shippingAddress.addressLocationType;		

		$scope.shipPostUrl = $scope.accountSettings.shippingAddress.meta.href;

		//Billing Data
		$scope.billFirstName = $scope.accountSettings.billingAddress.firstName;
		$scope.billLastName = $scope.accountSettings.billingAddress.lastName;
		$scope.billLineOne = $scope.accountSettings.billingAddress.lineOne;
		$scope.billLineTwo = $scope.accountSettings.billingAddress.lineTwo;
		$scope.billCity = $scope.accountSettings.billingAddress.city;
		$scope.billState = $scope.accountSettings.billingAddress.state;						
		$scope.billZip = $scope.accountSettings.billingAddress.postalCode;
		$scope.billCountry = $scope.accountSettings.billingAddress.countryCode;
		$scope.billLocType = $scope.accountSettings.billingAddress.addressLocationType;

		$scope.billPostUrl = $scope.accountSettings.billingAddress.meta.href;		

		//Contact Data
		$scope.currentEmailAddress = $scope.accountSettings.contactInfo.email.defaultEmailAddress;

		$scope.emailPostUrl = $scope.accountSettings.contactInfo.email.meta.href;

		$scope.currentPhoneOne = $scope.accountSettings.contactInfo.phone.alternatePhoneOne;
		$scope.currentPhoneTwo = $scope.accountSettings.contactInfo.phone.alternatePhoneTwo;
		$scope.currentPhoneDay = $scope.accountSettings.contactInfo.phone.dayTimePhone;

		$scope.phonePostUrl = $scope.accountSettings.contactInfo.phone.meta.href;

		//Authorized Users
		$scope.authUsers = $scope.accountSettings.authorizedUsers.items;	


		$scope.authUsersApiUrl = $scope.accountSettings.authorizedUsers.meta.href;

		$scope.authUsersDelUrls = [];
		for (var i=0; i< $scope.authUsers.length; i++) {
			$scope.authUsersDelUrls.push($scope.authUsers[i].meta.href);
		};

	});

	$scope.activeItem = '';
	$scope.toggleState = false;

	$scope.toggleForm = function(input) {

		//if the click was on a form that's not already open, then reset everything before setting active form and switching toggle state
		if ($scope.activeItem != input) {
			$scope.activeItem = '';	
			$scope.toggleState = false;			
			jQuery('.ma-form-wrap').slideUp();
			$scope.closeAlerts();
		}

		$scope.activeItem = input;
		$scope.toggleState = !$scope.toggleState;

		switch (input) {
			case 'email':
				jQuery('#email-form').slideToggle('slow', function() {
					if(jQuery(this).is(":visible")) {
						jQuery('html, body').animate({
							scrollTop: $("#email-data").offset().top
						}, 500);
					}
				});
				break;
			case 'billing':
				jQuery('#billing-form').slideToggle('slow', function() {
					if(jQuery(this).is(":visible")) {					
						jQuery('html, body').animate({
							scrollTop: $("#billing-data").offset().top
						}, 500);
					}
				});				
				break;
			case 'shipping':
				jQuery('#shipping-form').slideToggle('slow', function() {
					if(jQuery(this).is(":visible")) {					
						jQuery('html, body').animate({
							scrollTop: $("#shipping-data").offset().top
						}, 500);
					}
				});				
				break;
			case 'phone':
				jQuery('#phone-form').slideToggle('slow', function() {
					if(jQuery(this).is(":visible")) {					
						jQuery('html, body').animate({
							scrollTop: $("#phone-data").offset().top
						}, 500);
					}
				});				
				break;
			case 'auth-users':
				jQuery('#authorized-users-form').slideToggle('slow', function() {
					if(jQuery(this).is(":visible")) {					
						jQuery('html, body').animate({
							scrollTop: $("#auth-users-data").offset().top
						}, 500);
					}
				});				
				break;
		};
		
	};

	// Change-Email-Form in Account overview

	$scope.isSuccess = false;
	$scope.isFailure = false;

	$scope.showSuccess = function(message) {
		$scope.successMessage = message;
		$scope.isSuccess = true;
		$scope.isFailure = false;
		jQuery('html, body').animate({
			scrollTop: $("#ao-wrap").offset().top
		}, 500);
	};

	$scope.showFailure = function(message) {
		$scope.failureMessage = message;
		$scope.isSuccess = false;
		$scope.isFailure = true;
	};

	$scope.closeAlerts = function() {
		$scope.isSuccess = false;
		$scope.isFailure = false;
	};

	$scope.resetForm = function(input){

		switch (input) {
			case 'email':
				$scope.toggleForm(input);			
				$scope.newEmailAddress ="";
				$scope.newEmailPassword ="";
				break;
			case 'billing':
				$scope.toggleForm(input);			
				$scope.accountSettings.billingAddress.firstName = $scope.billFirstName;
				$scope.accountSettings.billingAddress.lastName = $scope.billLastName;
				$scope.accountSettings.billingAddress.lineOne = $scope.billLineOne;
				$scope.accountSettings.billingAddress.lineTwo = $scope.billLineTwo;
				$scope.accountSettings.billingAddress.city = $scope.billCity;
				$scope.accountSettings.billingAddress.state = $scope.billState;						
				$scope.accountSettings.billingAddress.postalCode = $scope.billZip;
				$scope.accountSettings.billingAddress.countryCode = $scope.billCountry;
				$scope.accountSettings.billingAddress.addressLocationType = $scope.billLocType;
				break;				
			case 'shipping':
				$scope.toggleForm(input);			
				$scope.accountSettings.shippingAddress.firstName = $scope.shipFirstName;
				$scope.accountSettings.shippingAddress.lastName = $scope.shipLastName;
				$scope.accountSettings.shippingAddress.lineOne = $scope.shipLineOne;
				$scope.accountSettings.shippingAddress.lineTwo = $scope.shipLineTwo;
				$scope.accountSettings.shippingAddress.city = $scope.shipCity;
				$scope.accountSettings.shippingAddress.state = $scope.shipState;						
				$scope.accountSettings.shippingAddress.postalCode = $scope.shipZip;
				$scope.accountSettings.shippingAddress.countryCode = $scope.shipCountry;
				$scope.accountSettings.shippingAddress.addressLocationType = $scope.shipLocType;
				break;	
			case 'phone':
				$scope.toggleForm(input);			
				$scope.accountSettings.contactInfo.phone.alternatePhoneOne = $scope.currentPhoneOne;
				$scope.accountSettings.contactContactContext.alternatePhoneTwo = $scope.currentPhoneTwo;
				$scope.accountSettings.contactContactContext.dayTimePhone = $scope.currentPhoneDay;
				break;	
			case 'auth-users':
				$scope.toggleForm(input);			
				$scope.newAuthFirst = '';
				$scope.newAuthLast = '';
				break;	
		}
	};

	$scope.saveForm = function(input) {

		switch (input) {
			case 'email':
				var postData = {
					"defaultEmailAddress": "" + $scope.currentEmailAddress,
					"newEmailAddress":"" + $scope.newEmailAddress,			
					"password":"" + $scope.newEmailPassword,
					"firstName":"" + $scope.billFirstName,
					"lastName":"" + $scope.billLastName
				};

				dataFactory.saveEmailChange(postData, $scope.emailPostUrl).success(function(data) {
					var successMessage = "Success! Your Email has been Updated."
					$scope.showSuccess(successMessage);

					$scope.currentEmailAddress = postData.newEmailAddress;
					$scope.resetForm('email');
				}).error(function(data) {
					$scope.showFailure();

				});
				break;
			case 'billing':
				var postData = {
					"firstName": "" + $scope.accountSettings.billingAddress.firstName,
					"lastName":"" + $scope.accountSettings.billingAddress.lastName,			
					"lineOne":"" + $scope.accountSettings.billingAddress.lineOne,
					"lineTwo":"" + $scope.accountSettings.billingAddress.lineTwo,
					"lineThree":"" + $scope.accountSettings.billingAddress.lineThree,
					"city":"" + $scope.accountSettings.billingAddress.city,
					"state":"" + $scope.accountSettings.billingAddress.state,
					"addressLocationType": "" + $scope.accountSettings.billingAddress.addressLocationType,
					"postalCode":"" + $scope.accountSettings.billingAddress.postalCode,
					"countryCode":"" + $scope.accountSettings.billingAddress.countryCode
				};

				dataFactory.saveBillingChange(postData, $scope.billPostUrl).success(function(data) {
					var successMessage = "Success! Your Billing Information has been Updated."
					$scope.showSuccess(successMessage);

					$scope.billFirstName = postData.firstName;
					$scope.billLastName = postData.lastName;
					$scope.billLineOne = postData.lineOne;
					$scope.billLineTwo = postData.lineTwo;
					$scope.billCity = postData.city;
					$scope.billState = postData.state;						
					$scope.billZip = postData.postalCode;
					$scope.billCountry = postData.countryCode;
					$scope.billLocType = postData.addressLocationType;					
					$scope.resetForm('billing');
				}).error(function(data) {
					$scope.showFailure();

				});
				break;		
			case 'shipping':
				var postData = {
					"firstName": "" + $scope.accountSettings.shippingAddress.firstName,
					"lastName":"" + $scope.accountSettings.shippingAddress.lastName,			
					"lineOne":"" + $scope.accountSettings.shippingAddress.lineOne,
					"lineTwo":"" + $scope.accountSettings.shippingAddress.lineTwo,
					"lineThree":"" + $scope.accountSettings.shippingAddress.lineThree,
					"city":"" + $scope.accountSettings.shippingAddress.city,
					"state":"" + $scope.accountSettings.shippingAddress.state,
					"addressLocationType": "" + $scope.accountSettings.shippingAddress.addressLocationType,
					"postalCode":"" + $scope.accountSettings.shippingAddress.postalCode,
					"countryCode":"" + $scope.accountSettings.shippingAddress.countryCode
				};

				dataFactory.saveShippingChange(postData, $scope.shipPostUrl).success(function(data) {
					var successMessage = "Success! Your Shipping Information has been Updated."
					$scope.showSuccess(successMessage);

					$scope.shipFirstName = postData.firstName;
					$scope.shipLastName = postData.lastName;
					$scope.shipLineOne = postData.lineOne;
					$scope.shipLineTwo = postData.lineTwo;
					$scope.shipCity = postData.city;
					$scope.shipState = postData.state;						
					$scope.shipZip = postData.postalCode;
					$scope.shipCountry = postData.countryCode;
					$scope.shipLocType = postData.addressLocationType;					
					$scope.resetForm('shipping');
				}).error(function(data) {
					$scope.showFailure();

				});
				break;	
			case 'phone':
				var postData = {
					"dayTimePhone": "" + $scope.accountSettings.contactInfo.phone.dayTimePhone,
					"altPhoneOne":"" + $scope.accountSettings.customerContactContext.alternatePhoneOne,			
					"altPhoneTwo":"" + $scope.accountSettings.customerContactContext.alternatePhoneTwo
				};

				dataFactory.savePhoneChange(postData, $scope.phonePostUrl).success(function(data) {
					var successMessage = "Success! Your Phone Number has been Updated."
					$scope.showSuccess(successMessage);

					$scope.currentPhoneDay = postData.dayTimePhone;
					$scope.currentPhoneOne = postData.altPhoneOne;
					$scope.currentPhoneTwo = postData.altPhoneTwo;				
					$scope.resetForm('phone');
				}).error(function(data) {
					$scope.showFailure();

				});
				break;
			case 'add-auth-users':
				console.log('entered function!');
				var putData = {
					"firstName": "" + $scope.newAuthFirst,
					"lastName":"" + $scope.newAuthLast
				};

				dataFactory.addAuthUsers(putData, $scope.authUsersApiUrl).success(function(data) {
					var successMessage = "Success! " + putData.firstName + " " + putData.lastName + " has been Added as an Authorized User on Your Account."
					$scope.showSuccess(successMessage);

					var updatedData = {
						"authorizedUserId":"" + data.authorizedUserId,
						"firstName":"" + data.firstName,
						"lastName":"" + data.lastName
					}

					$scope.authUsers.push(updatedData);	

					console.log('entered success');

					$scope.resetForm('auth-users');
				}).error(function(data) {
					var failureMessage = "We're sorry, there was an error in adding this authorized user."					
					$scope.showFailure(failureMessage);

					console.log('entered error');

				});
				break;	
			case 'del-auth-users':
				var deleteData = {
					"firstName":"",
					"lastName":""
				};

				dataFactory.deleteAuthUsers(deleteData, $scope.authUsersApiUrl).success(function(data) {
					var successMessage = "Success! " + deleteData.firstName + " " + deleteData.lastName + " has been Removed as an Authorized User on Your Account."
					$scope.showSuccess(successMessage);

					//$scope.authUsers.push(putData);	

					$scope.resetForm('auth-users');
				}).error(function(data) {
					var failureMessage = "We're sorry, there was an error in deleting this authorized user."
					$scope.showFailure(failureMessage);

				});
				break;																

		};

	};

}]);