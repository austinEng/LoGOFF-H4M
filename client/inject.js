
var dynamicStyle;
var dynamicScript;

function loadPage(id) {
	var page = id.substring(1);
	$(".content").html("");

	if (typeof(dynamicStyle) !== "undefined") {
		dynamicStyle.remove();
	}
	if (typeof(dynamicScript) !== "undefined") {
		dynamicScript.remove();
	}

	dynamicScript = document.createElement('script');
	dynamicScript.src = chrome.extension.getURL("script/" + page + ".js");
	dynamicScript.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(dynamicScript);
	
	dynamicStyle = document.createElement('link');
	dynamicStyle.rel = "stylesheet";
	dynamicStyle.type = "text/css";
	dynamicStyle.href = chrome.extension.getURL("style/" + page + ".css");
	(document.head||document.documentElement).appendChild(dynamicStyle);

	$(".content").load(chrome.extension.getURL("views/" + page + ".html"));
}

$(document).ready(function() {
	
});

$("body").on("click", ".h4m-link", function(){
	loadPage($(this).attr('href'));
});

// link the current user to a user in our db
$.ajax({
	type: 'POST',
	url: 'http://welogoff.com/Home/getProfileId',
	success: function(userid) {
		/*$.ajax({
			type: 'POST',
			crossDomain: true,
			url: 'http://62def5c0.ngrok.com/users/setCurrent',
			data: {
				userid: userid
			},
			success: function(user) {
				console.log(user);
			},
			dataType: 'json'
		});*/
	}
})

if (window.location.hash) {
	loadPage(window.location.hash);
}

var homeBtn = $('.nav > a')[0];
var el = $("<a href='#event-feed' class='h4m-link'> \
	<div class='event-btn'> \
	<img  /> \
	</div> \
	</a>");
el.insertAfter(homeBtn);