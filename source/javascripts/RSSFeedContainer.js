/**
 * Wrapper to RSS Feeds
 * @param {[type]} raw  Raw feeds object
 * @param {[String]} type LinkedIn, Facebook, Twitter, YouTube
 */
var RSSFeedContainer = function (type, container) {
	this.type = type;
	this.container = container;
	this.url = "";
	var source   = $("#rssTmp").html();
	this.template = Handlebars.compile(source);

	this.numUnread = 0;
	
}

RSSFeedContainer.prototype = {

	_processFeeds: function(feed){
 		var thi$ = this;
 		thi$.numUnread = 0;

		$.each( feed.entries, function( key, value ) {
			var id, feedDate = value.publishedDate;
			if(feedDate != ""){
			    id  = new Date(feedDate).getTime();
			}else{
			    id  = value.link;
			}

			if(typeof(Storage)!=="undefined")
				{									
					if(localStorage[id] == 1){
						//read
						value.read = true;
					}else{
						value.read = false;
						 thi$.numUnread++;
					}

				}

		}); 


		var comments = $("#" + thi$.type + "-unread");
		comments.html( thi$.numUnread );	

		
	},


	_getFeeds: function (numFeeds, callback) {
        var thi$ = this;
        $.ajax({
			url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + numFeeds +'&callback=?&q=' + encodeURIComponent(thi$.url),
			dataType: 'jsonp',
			type: 'GET',
			timeout: 5000,
			async: false,
			// xhrFields: {
			// 	withCredentials: true
			// },
          success: function(data) {
            thi$.feed = data.responseData.feed;
			thi$._processFeeds(thi$.feed);

            if (callback) {
				callback.call(thi$);
            }
            	
         },
         error: function (data) {
              alert('fail' + data);
         }
      });
    },

	render: function() {
			var thi$ = this;
			thi$.container.append( thi$.template(thi$.feed) );

			$(".rss-container ul li:not('.hidden')").on("click touchstart", function(event) {
				var id, feedDate = $(this).data("feeddate");
				if(feedDate != ""){
				    id  = new Date(feedDate).getTime();      
				}else{
				    id  = $(this).data("feedid");
				}
				
				if(typeof(Storage)!=="undefined") {
					if(localStorage[id] == 1){

					}else{
						localStorage[id] = 1;	
						thi$.numUnread--;
					}
					
				}

				$("#" + thi$.type + "-unread").html(thi$.numUnread);
				//expand collapse
				alert($(this).hasClass("show"));
				if($(this).hasClass("show")){
					$(".rss-container ul li:not('.hidden')").removeClass("show");
				}else{
					$(".rss-container ul li:not('.hidden')").removeClass("show");
					$(this).addClass("read show");   					
				}  

			});  	
	},

	fetch: function() {
		var thi$ = this;
		switch(thi$.type){
			case "twitter": 
				thi$.url = 'http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=optier';
				break;
			case "linkedin": 
				thi$.url = 'http://www.linkedin.com/rss/nus?key=WhjzfiEewQ2qrnoEyOkma479eb0yRdY7EuwBxi6RremAaY7KBmy394ZUfVuhXxXC7pY'; //optier liron
				thi$.url = 'http://www.linkedin.com/rss/nus?key=tLJNUGbKw896RLjhb3nDKCRswYfy2UUrOjknlFzsS-lAcW5JkZyY4KPeWHRHGE0m-hE'; //nadav
				break;
			case "youtube": 
				thi$.url = 'http://www.youtube.com/rss/user/OpTier01/videos.rss';
	            break;
	        case "blog": 
	            thi$.url = 'http://www.optier.com/blog/?feed=rss';
	            break;
		}
		thi$._getFeeds(10, thi$.render);
	}

}