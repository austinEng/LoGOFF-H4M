var api = {};

$.ajax({
	type: 'POST',
	url: 'http://welogoff.com/Home/getProfileId',
	success: function(userid) {
		console.log('userid: ' + userid);
		var domain = 'http://lvh.me:3000/';

		// params.tags is a comma-separated list of strings
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

		api.getUserEvents = function (cb) {
			$.ajax({
				type: 'GET',
				crossDomain: true,
				url: domain + 'events?userid=' + userid,
				success: function(events) {
					cb(events);
				},
				dataType: 'json'
			});
		}

		$(document).ready(function (){
			api.createNewEvent({
				title: "This is a test title",
				location: "My backyard",
				description: "This is a description"
			}, function (ev) {
				api.getUserEvents(function (events) {
					console.log(events);
				});
				api.getFeedEvents(function (events) {
					console.log(events);
				});
			});
		});
	}
});