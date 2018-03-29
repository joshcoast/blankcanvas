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
var database = firebase.database();



// Scroll effect for nav bar
window.addEventListener('scroll', function () {
	document.body.classList[
		window.scrollY > 20 ? 'add' : 'remove'
	]('scrolled');
});

$(document).ready(function () {

	var user = firebase.auth().currentUser;
	var name, email, photoUrl, uid, emailVerified;

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			console.log("user: " + firebase.auth().currentUser.displayName);
			console.log("email: " + firebase.auth().currentUser.email);
			console.log("uid: " + firebase.auth().currentUser.uid);
			console.log("photoUrl: " + firebase.auth().currentUser.photoUrl);
			if (user != null) {
				name = user.displayName;
				email = user.email;
				photoUrl = user.photoURL;
				emailVerified = user.emailVerified;
				uid = uid; // The user's ID, unique to the Firebase project. Do NOT use
				// this value to authenticate with your backend server, if
				// you have one. Use User.getToken() instead.
			}
		} else {
			// window.location.href="../../index.html"
			// No user is signed in.
		}
	});



	// Moved form profile page to here TODO find out what this is
	$(".dropdown-button").dropdown();
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

	// -- Image Upload -- //

	//Get elements
	var uploader = $("#uploader");
	var fileButton = $("#fileButton");

	//Listen for file selection
	fileButton.on("change", function (e) {
		// Get the file
		var file = e.target.files[0];
		console.log(e.target.files[0].name);

		// Create a storage ref
		var storageRef = firebase.storage().ref("profile_pic/" + file.name);

		// Upload file
		var task = storageRef.put(file);

		// Update progress bar 
		task.on('state_changed',

			function progress(snapshot) {
				var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				uploader.value = percentage;
			},
			function error(err) {

			},
			function complete() {
				var downloadURL = task.snapshot.downloadURL;
				console.log("---");
				console.log(downloadURL);
				console.log("---");
				$("#profilePicture").attr("src", downloadURL);
			}
		);
	});





















}); // end doc ready