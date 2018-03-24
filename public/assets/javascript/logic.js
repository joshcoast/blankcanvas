// Initialize Firebase
var config = {
	apiKey: "AIzaSyCjtkoViUWyLVJYP_NfVaqO8tJoKbvIRj8",
	authDomain: "blankcanvas-43876.firebaseapp.com",
	databaseURL: "https://blankcanvas-43876.firebaseio.com",
	projectId: "blankcanvas-43876",
	storageBucket: "blankcanvas-43876.appspot.com",
	messagingSenderId: "784751662446"
};
firebase.initializeApp(config);


$(document).ready(function () {

	var user = firebase.auth().currentUser;
	var name, email, photoUrl, uid, emailVerified;

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
		} else {
			// window.location.href="../../index.html"
			// No user is signed in.
		}
	});

	if (user != null) {
		name = user.displayName;
		email = user.email;
		photoUrl = user.photoURL;
		emailVerified = user.emailVerified;
		uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
		// this value to authenticate with your backend server, if
		// you have one. Use User.getToken() instead.
	}
	console.log("user: " + user);
	console.log("email: " + email);
	console.log("uid: " + uid);
	console.log("photoUrl: " + photoUrl);



	// Moved form profile page to here TODO find out what this is
	$('.slider').slider();
	$('.collapsible').collapsible();
	$(".button-collapse").sideNav();
	// Chips:
	var chip = {
		tag: 'chip content',
		image: '', //optional
		id: 1, //optional
	};
	$('.chips').on('chip.add', function (e, chip) {
		// you have the added chip here
	});
	$('.chips').on('chip.delete', function (e, chip) {
		// you have the deleted chip here
	});
	$('.chips').on('chip.select', function (e, chip) {
		// you have the selected chip here
	});
	$('.chips').material_chip();
	$('.chips-initial').material_chip({
		data: [{
			tag: 'Apple',
		}, {
			tag: 'Microsoft',
		}, {
			tag: 'Google',
		}],
	});
	$('.chips-placeholder').material_chip({
		placeholder: 'Enter an interest',
		secondaryPlaceholder: '+Tag',
	});
	$('.chips-autocomplete').material_chip({
		autocompleteOptions: {
			data: {
				'Apple': null,
				'Microsoft': null,
				'Google': null
			},
			limit: Infinity,
			minLength: 1
		}
	});
}); // end doc ready