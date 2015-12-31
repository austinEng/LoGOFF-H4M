var api = {};

$.ajax({
	type: 'POST',
	url: 'http://welogoff.com/Home/getProfileId',
	success: function(userid) {
		console.log('userid: ' + userid);
		var domain = 'http://lvh.me:3000/'

		
		function insertEventItem(params) {
			var tagsHtml = "";
			if (params.tags) {
				for (var i = 0; i < params.tags.length; i++) {
					tagsHtml = tagsHtml + "<span>" + params.tags[i] + "</span>";
				}
			}
			var html =  "<div class='prayer-block universal-id logoff-message block-4'> \
				<img class='display-pic' src='images/logoff-profile.svg' alt='display image' /> \
    			<p class='event-title'>" + params.title + "</p> \
    			<p class='event-loc-time'><span>" + params.location + "</span> | <span>" + params.datetime + "</span></p> \
    			<p class='event-desc'>" + params.description + "</p> \
    			<div class='event-tags'> " + tagsHtml + " </div> \
			</div>";
			$(html).insertAfter($('#new-event'));
		}

		api.createNewEvent = function (params, cb) {
			if (params.tags) {
				params.tags = params.tags.split(',');
			}
			$.ajax({
				type: 'POST',
				crossDomain: true,
				url: domain + 'events/create?userid=' + userid,
				data: params,
				success: function (ev) {
					cb(ev);
				},
				dataType: 'json'
			});
		}

		api.getFeedEvents = function (cb) {
			$.ajax({
				type: 'POST',
				url: 'http://welogoff.com/Profile/GetMyFollowingList',
				success: function (data) {
					var ids = [userid];
					for (var i = 0; i < data.followinglist.length; i++) {
						ids.push(data.followinglist[i][1]);	
					}
					ids = ids.join(',');
					$.ajax({
						type: 'GET',
						crossDomain: true,
						url: domain + 'events/feed?ids=' + ids,
						success: function (events) {
							cb(events);
						},
						dataType: 'json'
					});
				},
				dataType: 'json'
			})
		}


		insertEventItem({
			title: 'This is the event title',
			location: 'My Backyard',
			time: 'Tomorrow at 5:00pm',
			description: 'This is a test description. This is a test description. This is a test description. This is a test description. '
		});

		$('#create-event-form').on('submit', function (e) {
			e.preventDefault();
			var params = {
				title: $('#title-field').val(),
				location: $('#location-field').val(),
				datetime: $('#datetime-field').val(),
				description: $('#description-field').val(),
				tags: $('#tags-field').val()
			}
			api.createNewEvent(params, function (ev) {
				console.log(ev);
				insertEventItem(ev);
			});
		});

		api.getFeedEvents(function (events) {
			for (var i = 0; i < events.length; i++) {
				insertEventItem(events[i]);
			}
		});

	}

});

function expandEventCreation() {
	$("#new-event-btn h2, #new-event-btn img").stop(true, true).fadeOut(100, function(){
		$('#new-event-btn')
		.transition({width: "20px"}, 300)
        .transition({scale: .15 }, 200)
        .transition({top: "30px"}, 200, function(){ 
        	$('#new-event-btn').stop(true, true).css("display","none");
        });

        $('#new-event .green-line').stop(true, true)
        .delay(680)
        .transition({width:"100%", left:"0px"},300, function(){
        	$("#new-event .wrapper").stop(true, true).slideDown(300).fadeTo(300, 1);
        });
	});
}

function cancelEventCreation() {
	$("#new-event .wrapper").stop(true, true).fadeTo(300, 0).slideUp(300, function(){
        $("#new-event .green-line").stop(true, true).transition({width:"0px", left:"50%"},300, function(){

            $('#new-event-btn').stop(true, true).transition({top: "7px"}, 200)
            .transition({scale: 1 }, 200)
            .transition({width: "150px"}, 200) ;
            $("#new-event-btn h2, #new-event-btn img").stop(true, true).delay(550).fadeIn(100);

        });
        $('#new-event-btn').stop(true, true).css("display","block");

    });
}

$('#new-event-btn').click(function() {
	expandEventCreation();
});

$('#new-event .cancel-post').click(function() {
	cancelEventCreation();
});

$('.event-btn img').attr('src', 'images/refresh.svg');

$('.feed-btn').removeClass('active').css('background-color', '');

$('.feed-btn img').attr('src', 'images/feed-icon.svg');