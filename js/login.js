var ref = new Firebase("https://yikchat.firebaseio.com/");

$("#login-btn").click(function(){
	ref.authWithOAuthPopup("facebook", function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	  }
	});
})
