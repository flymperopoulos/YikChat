var fireBaseRef = new Firebase("https://yikchat.firebaseio.com/");
var snd = new Audio("data/sound/sound.mp3"); 

function refresh() {
    location.reload();
}

$("#submit-btn").bind("click", function() {
    var comment = $("#comments");
    var commentValue = $.trim(comment.val());

    var name = $("#names");
    var nameValue = $.trim(name.val());

    if (commentValue.length === 0 || nameValue.length === 0) {
        alert('Please enter a name or an appropriate comment');
    } else {
        fireBaseRef.push({ name: nameValue, comment: commentValue}, function(error) {
            if (error !== null) {
                alert('Unable to push comments to Firebase!');
            }
        });

        comment.val("");
    }

    return false;
});

$("#clear-btn").click("click", function() {

	var onComplete = function(error) {
	  if (error) {
	    console.log('Synchronization failed');
	  } else {
	    console.log('Synchronization succeeded');
	  }
	};

	fireBaseRef.remove(onComplete);
	$("#comments-container").empty();
});

fireBaseRef.on('child_added', function(snapshot) {

    var uniqName = snapshot.name();
    var comment = snapshot.val()["comment"];
    var name = snapshot.val()["name"];

    var commentsContainer = $('#comments-container');

    $('<div/>', {class: 'comment-container'})
        .html('<span class="label label-default"> ' 
            + name + '</span>' + comment).appendTo(commentsContainer);

    snd.play();

    commentsContainer.scrollTop(commentsContainer.prop('scrollHeight'));
});