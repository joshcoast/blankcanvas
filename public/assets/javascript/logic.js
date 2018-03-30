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
	var name, email, uid, emailVerified, profilePic;



	firebase.auth().onAuthStateChanged(function (user) {
		// database.ref().push({user});
		if (user) {
			// User is signed in.
			if (user != null) {

				var name = user.displayName;
				console.log(user.displayName);
				var email = user.email;
				console.log(user.email);
				var uid = "/" + user.uid;
				console.log(user.uid);



				name = user.displayName;
				email = user.email;
				emailVerified = user.emailVerified;
				uid = uid; // The user's ID, unique to the Firebase project. Do NOT use
				// this value to authenticate with your backend server, if
				// you have one. Use User.getToken() instead.

				database.ref(uid).set({
					name: name,
					email: email,
					uid: uid,
					profilePic: profilePic
				});

				$("#idName").text(name);
				$("#idUrl").text(email);

				// // -- Image Upload -- //

				// //Get elements
				// var uploader = $("#uploader");
				// var fileButton = $("#fileButton");

				// //Listen for file selection
				// fileButton.on("change", function (e) {
				// 	// Get the file
				// 	var file = e.target.files[0];
				// 	console.log(e.target.files[0].name);

				// 	// Create a storage ref
				// 	var storageRef = firebase.storage().ref("profile_pic/" + file.name);

				// 	// Upload file
				// 	var task = storageRef.put(file);

				// 	// Update progress bar 
				// 	task.on('state_changed',

				// 		function error(err) {

				// 		},
				// 		function complete() {
				// 			profilePic = task.snapshot.profilePic;
				// 			console.log("---");
				// 			console.log(profilePic);
				// 			console.log("---");
				// 			$("#profilePicture").attr("src", profilePic);
				// 			var userPhoto = user + "/" + profilePic;
				// 			database.ref(userPhoto).set({ profilePic: profilePic });
				// 		}
				// 	);
				// });
			}
		} else {
			window.location.href = "../../index.html"
			// No user is signed in.
			console.log("User profile not made.");
		}
	});


























}); // end doc ready