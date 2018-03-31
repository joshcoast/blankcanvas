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

	$("#start").on("click", function () {
		var firstName = $("#first_name").val();
		var lastName = $("#last_name").val();
		var title = $("#title").val();
		var website = $("#website").val();
		var file = $("#file").val();

		$("#idName").append(firstName);
		// $("#last_name").text(lastName);
		$("#idTitle").text(title);
		$("idUrl").text(website);
		// $("#file").text(file);
	})

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

				var interestChips = [];
				// This function will Grab the information from the user sign up? Not sure if we will need it.
				function interestrenderChips() {
				}
				// slider and collapsible functions:
				$('.slider').slider();
				$('.collapsible').collapsible();
				$(".button-collapse").sideNav();
				// Chips:
				var apiInterest = ""
				var interest = ""
				var chip = {
					tag: 'chip content',
					image: '', //optional
					id: 1, //optional
					Ckey: 'data-key'
				};
				// interest chips:
				$('#ChipsInterest').on('chip.add', function (e, chip) {
					e.preventDefault();

					interest = chip.tag;

				});
				database.ref().on("child_added", function (childSnapshot) {
					interestChips.push({ interest: childSnapshot.val().interest, key: childSnapshot.key });
					var chipInit = interestChips.map(chip => ({ tag: chip.interest, key: chip.key }));
					$('.chips').material_chip({
						data: chipInit
					});
					$('.chip').attr('data-key', childSnapshot.key);

					apiInterest = childSnapshot.val().interest;
					loadApi()
				});

				$('.chips').on('chip.delete', function (e, chip) {
					database.ref('/' + chip.key).remove();
					$("#InterestDiv").empty();
					loadApi()
				});
				$('.chips').on('chip.select', function (e, chip) {
					// you have the selected chip here
				});
				$('.chips').material_chip();
				$('.chips-placeholder').material_chip({
					placeholder: 'Enter an interest',
					secondaryPlaceholder: '+ interest',
				});

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
					interest: interest,
					//	profilePic: profilePic
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
			// window.location.href = "../../index.html"
			// No user is signed in.
			console.log("User profile not made.");
		}
	});
	$(".signOut").on("click", function () {
		firebase.auth().signOut().then(function () {
			console.log("signed out");
		}).catch(function (error) {
			window.location.href="../../404.html"
			console.log("Whoops. An error occured");
		});
	})


	// firebase.auth().currentUser.push({ interest: interest });
	//firebase.database().ref().child(firebase.auth().currentUser).push({ interest: interest });
	//firebase.database().ref().child(uid).push({ interest: interest });
	//firebase.database().ref().child('uid').push({ interest: interest });
	//database.ref().child(this.uid).push({ interest: interest });
	//firebase.database().ref().user.push({ interest: interest });
	//firebase.database().ref().child(user).push({ interest: interest });
	//firebase.database().ref().child(user).push({ interest: interest });
	//database.ref().push({ interest: interest })
	//database.ref(user.uid).push({ interest: interest })
	//user.push({ interest: interest });
	//database.ref().currentUser.push({ interest: interest });
	//database.ref(uid).push({ interest: interest })
	// Google Custom Search:

	// function loadApi() {	
	// 	var cx = '002690778075665955245:ytl48lknafo';
	// 	var queryURL = "https://www.googleapis.com/customsearch/v1?key=" +
	// 		"AIzaSyDhBFUxT1VXUOEMHmPtB7LiVuxQXwrH_9I&cx=" + cx + "&q=" + apiInterest;
	// 	$.ajax({
	// 		url: queryURL,
	// 		method: "GET"
	// 	}).then(function (response) {
	// 		console.log(response);
	// 		var results = response.items;
	// 		for (var i = 0; i < 1; i++) {
	// 			$("#InterestDiv").prepend(`<div class="row collection-item">
	// 																		<div class="col s10 m10 l10">
	// 																				<li >
	// 																				<span class="title">${results[i].title}</span>
	// 																				</li>
	// 																		</div>
	// 																		<div class="col s2 m2 l2">
	// 																				<a href="#!" class="secondary-content">  
	// 																				<input type="checkbox" id="saveThis" class="saveCheckbox" />
	// 																				<label for="saveThis">Save</label>
	// 																		</div>
	// 																</div>`

	// 			)
	// 		};
	// 	});
	// }

}); // end doc ready