var api = {};

$.ajax({
	type: 'POST',
	url: 'http://welogoff.com/Home/getProfileId',
	success: function(userid) {
		console.log('userid: ' + userid);
		var domain = 'http://lvh.me:3000/'

		
		function insertEventItem(params) {
			var html =  "<div class='prayer-block universal-id logoff-message block-4'> \
				<img class='display-pic' src='images/logoff-profile.svg' alt='display image' /> \
    			<p class='event-title'>" + params.title + "</p> \
    			<p class='event-loc-time'><span>" + params.location + "</span> | <span>" + params.time + "</span></p> \
    			<p class='event-desc'>" + params.description + "</p> \
			</div>";
			$(html).insertAfter($('#new-post-btn'));
		}


		insertEventItem({
			title: 'This is the event title',
			location: 'My Backyard',
			time: 'Tomorrow at 5:00pm',
			description: 'This is a test description. This is a test description. This is a test description. This is a test description. '
		});

	}

});