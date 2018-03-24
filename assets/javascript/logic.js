// Init Firebase
	var config = {
		apiKey: "AIzaSyCjtkoViUWyLVJYP_NfVaqO8tJoKbvIRj8",
		authDomain: "blankcanvas-43876.firebaseapp.com",
		databaseURL: "https://blankcanvas-43876.firebaseio.com",
		projectId: "blankcanvas-43876",
		storageBucket: "blankcanvas-43876.appspot.com",
		messagingSenderId: "784751662446"
	};
	firebase.initializeApp(config);

	// FirebaseUI config.
	var uiConfig = {
		signInSuccessUrl: 'profile-page.html',
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		],
	};
	// Initialize the FirebaseUI Widget using Firebase.
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	// The start method will wait until the DOM is loaded.
	ui.start('#firebaseui-auth-container', uiConfig);

	alert("bob's the word turd");

$(document).ready(function () {
	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal({
		dismissible: false, // Modal can be dismissed by clicking outside of the modal
		opacity: .1, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '10%', // Ending top style attribute
		ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
			console.log(modal, trigger);
		},
	});
}); // end doc ready