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
	var name, email, uid, emailVerified;

	$("#save").on("click", function () {
		var firstName = $("#first_name").val();
		var lastName = $("#last_name").val();
		var title = $("#title").val();
		var website = $("#website").val();
		var file = $("#file").val();
		var location = $("#location").val();


		$("#idName").html(firstName);
		// $("#last_name").text(lastName);
		$("#idTitle").html(title);
		$("#idUrl").html(website);
		$("#idLocation").html(location);
		// $("#file").text(file);
	})

	// Authenticate User
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			if (user != null) {
				name = user.displayName;
				console.log(user.displayName);
				email = user.email;
				console.log(user.email);
				uid = "/" + user.uid;
				console.log(user.uid);
				var ud = (user.uid);

				// Write User info to database
				database.ref(uid).update({
					name: name,
					email: email,
					uid: uid
				});

				// Write User Info to DOM
				$("#idName").text(name);
				$("#idUrl").text(email);

				// Slider and collapsible functions (portfolio slideshow):
				$('.slider').slider();
				$('.collapsible').collapsible();
				$(".button-collapse").sideNav();

				// -- Image profile upload feature -- //
				var uidRef = database.ref(uid);
				displayProfilePic();

				$("#theInput").change(function (input) {
					console.log(input.target.files[0]);
					if (input.target.files && input.target.files[0]) {
						var reader = new FileReader();

						reader.onload = function (e) {
							$('#profilePicture')
								.attr('src', e.target.result);
							uidRef.update({
								profilePicture: e.target.result
							});

						};
						reader.readAsDataURL(input.target.files[0]);
					}
				});

				function displayProfilePic() {
					var profilePicRef = uid + "/profilePicture";
					console.log("profilePicRef: " + profilePicRef);
					firebase.database().ref(profilePicRef).on("value", function (snap) {
						var childData = snap.val();
						console.log(childData);
						$('#profilePicture').attr("src", childData);
					});
				}

				// -- Search Feature -- //
				var interestChips = [];
				// This function will Grab the information from the user sign up? Not sure if we will need it.
				function interestrenderChips() {}

				// Chips:
				var apiInterest = ""
				var interest = ""
				var chip = {
					tag: 'chip content',
					image: '', //optional
					id: 1, //optional
					Ckey: 'data-key'
				};

				// Interest Chips:
				$('#ChipsInterest').on('chip.add', function (e, chip) {
					e.preventDefault();
					interest = chip.tag;
					database.ref().child(ud).child('interests').push({
						interest: interest
					});
				});

				database.ref().child(ud).child('interests').on("child_added", function (snapshot) {
					// interestChips.push({ interest: childSnapshot.val().interest, key: database.ref().child(ud).key });
					interestChips.push({
						interest: snapshot.val().interest,
						key: snapshot.key
					});

					var chipInit = interestChips.map(chip => ({
						tag: chip.interest,
						key: chip.key
					}));

					$('.chips').material_chip({
						data: chipInit
					});

					//$('.chip').attr('data-key', childSnapshot.key);
					apiInterest = snapshot.val().interest;
					loadApi();
				});

				function loadApi() {
					var cx = '002690778075665955245:ytl48lknafo';
					var queryURL = "https://www.googleapis.com/customsearch/v1?key=" +
						"AIzaSyBcq5MgTwwPwkFtkactviSR_lYtfK6swVw&cx=" + cx + "&q=" + apiInterest;
					$.ajax({
						url: queryURL,
						method: "GET"
					}).then(function (response) {
						console.log(response);
						var results = response.items;
						for (var i = 0; i < 3; i++) {
							$("#InterestDiv").prepend(`<div class="row collection-item">
																				<div class="col s10 m10 l10">
																						<li >
																						<h5 class="title">${results[i].title}</h5>
																						<p>${results[i].snippet}</p>
																						<span ><a href="${results[i].link}">link text${results[i].displayLink} </a></span>
																						</li>
																				</div>
																				<div class="col s2 m2 l2">
																						<a href="#!" class="secondary-content">  
																						<input type="checkbox" id="saveThis" class="saveCheckbox" />
																						<label for="saveThis">Save</label>
																				</div>
																		</div>`

							)
						};
					});
				}

				$('.chips').on('chip.delete', function (e, chip) {
					var chipKeyDelq = '/' + interest.key;
					var chipKeyDel = interest;
					var udkeydel = ud.chipKeyDel
					var keyyy = ('/' + chip.key)
					console.log(keyyy)
					console.log(ud)
					console.log(chipKeyDelq)
					console.log(chipKeyDel)
					console.log(udkeydel)
					database.ref().child(ud).child('interests').child(keyyy).remove()
					//database.ref().child(ud).chipKeyDelq.remove()
					//firebase.database().ref().child('accounts').child(uid).set({
					//database.ref('/' + chip.key).remove();
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
			}
		} else {
			// No user is signed in, redirect to homepage.
			// window.location.href = "../../index.html"
			console.log("User profile not made.");
		}
	});

	// -- Sign Out -- //
	$(".signOut").on("click", function () {
		firebase.auth().signOut().then(function () {
			console.log("signed out");
		}).catch(function (error) {
			window.location.assign("https://blankcanvas-43876.firebaseapp.com/");
			console.log("Whoops. An error occurred");
		});
	})

}); // end doc ready