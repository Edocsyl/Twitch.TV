
function defineScreen($title){
	
	
	$("#game-list-header").text($title);
	$("#twitch-widget-itemlist").empty();
	$("#search").val("");
}


function selectItem(lI, operation, selector) {
		
	switch(operation) {
		case "next": lI = lI + 1
			$(selector).eq(lI).addClass("item_selected");
			$(selector).eq(lI - 1).removeClass("item_selected");
		break;
		case "back":  lI = lI - 1
			$(selector).eq(lI).addClass("item_selected");
			$(selector).eq(lI + 1).removeClass("item_selected");
		break;
		default: return;
	}

	return lI;
	
}

function searchChannel(search) {
	
	defineScreen("Search: " + search)
	
	  $.ajax({
          url: 'https://api.twitch.tv/kraken/search/streams?limit=100&q=' + search,
          type: 'GET',
          contentType: 'application/json',
          dataType: 'jsonp',
          success: function(data) {

          	$.each(data.streams, function(index, value){
          		
          		channel_name = value.channel.name
				channel_id = value.channel._id
				channel_image = value.preview.medium
				channel_display_name = value.channel.display_name
				channel_status = value.channel.status
				channel_viewers = value.viewers
				
          		$("#twitch-widget-itemlist").append("<div class='stream_item' name='" + channel_name + "' id='" + channel_id + "'><img src='" + channel_image + "'><br><b>" + channel_status + "</b><br/><div class='game_status'>" + channel_viewers + " viewers on " + channel_display_name + "</div></div>");

          	})
          }
		});
	
}

function showGames(){
	
	defineScreen("All Games")
	
	 $.ajax({
	          url: 'https://api.twitch.tv/kraken/games/top?limit=100&offset=0',
	          type: 'GET',
	          contentType: 'application/json',
	          dataType: 'jsonp',
	          success: function(data) {
	          	
	          	$.each(data.top, function(index, value){
	          		
	          		game_id = value.game._id;
	          		game_name = value.game.name;
	          		game_image = value.game.box.medium;
	          		game_viewers = value.viewers;
	          		
	          		$("#twitch-widget-itemlist").append("<div class='game_item' name='" + game_name + "' id='" + game_id + "'><img src='" + game_image + "'><br><b>" + game_name + "</b><br/><div class='game_status'>" + game_viewers + " viewers</div></div>");
	          	
	          	})
	
	          }
	}); 
	
}

function showChannels(){
	
	defineScreen("Channels")
	
	$.ajax({
		url: 'https://api.twitch.tv/kraken/streams?limit=100',
		type: 'GET',
		contentType: 'application/json',
		dataType: 'jsonp',
		success: function(data) {
	  	
			$.each(data.streams, function(index, value){
				
				channel_name = value.channel.name
				channel_id = value._id
				channel_image = value.preview.medium
				channel_display_name = value.channel.display_name
				channel_viewers = value.viewers
				channel_status = value.channel.status
				
				$("#twitch-widget-itemlist").append("<div class='stream_item' name='" + channel_name + "' id='" + channel_id + "'><img src='" + channel_image + "'><br><b>" + channel_status + "</b><br/><div class='game_status'>" + channel_viewers + " viewers on " + channel_display_name + "</div></div>");
			})
		}
	});
}