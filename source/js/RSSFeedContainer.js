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
	// this.entries = raw.responseData.feed.entries;
	// this.numFeeds = this.entries.length;
}

RSSFeedContainer.prototype = {

	_getFeeds: function (numFeeds, callback) {
        var thi$ = this;
        $.ajax({
          url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + numFeeds +'&callback=?&q=' + encodeURIComponent(thi$.url),
          dataType: 'json',
          success: function(data) {
            // var source   = $("#rssTmp").html();
            // var template = Handlebars.compile(source);
            // $("#feedContent").append(template(data.responseData.feed.entries[0]));
            // var feed = new RSSFeedContainer(data, "twitter");
            // feed.render($("#feedContent"));
            thi$.feed = data.responseData.feed;
            // thi$.title = data.responseData.feed.title;
            // thi$.entries = data.responseData.feed.entries;
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

			// $(".feed-item").on("click", function(event) {
   //              alert(event);
   //          });  

			$("ul li:not('.hidden')").on("click", function(event) {
            	//alert(event);

            	alert($(event.currentTarget).data("feeddate"));
            });  

			// thi$.container.append("<H2>" + thi$.title + "</H2>");
			// $(thi$.entries).each(function(index, feedData){
			// 	//DOM 
			// 	thi$.container.append( thi$.template(feedData) );					
			// });		
	},

	fetch: function() {
		var thi$ = this;
		switch(thi$.type){
			case "twitter": 
				thi$.url = 'http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=optier';
				break;
			case "linkedin": 
				// thi$.url = 'http://www.linkedin.com/rss/nus?key=WhjzfiEewQ2qrnoEyOkma479eb0yRdY7EuwBxi6RremAaY7KBmy394ZUfVuhXxXC7pY';
				thi$.url = 'http://www.linkedin.com/rss/nus?key=tLJNUGbKw896RLjhb3nDKCRswYfy2UUrOjknlFzsS-lAcW5JkZyY4KPeWHRHGE0m-hE';
				break;
			case "facebook": 
				thi$.url = 'facebook.com';
				break;
		}
		thi$._getFeeds(10, thi$.render);
	}

}