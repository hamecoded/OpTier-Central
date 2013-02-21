//Third Parties
//=require vendor/jquery-1.9.1.min
//=require vendor/jquery-migrate-1.1.1.min
//=require vendor/jquery.mobile-1.3.0.min
//=require plugins
//=require vendor/handlebars
//=require vendor/add2home


//=require RSSFeedContainer

$(document).delegate('.ui-page', 'pageshow', function () {
	$("#footer-list .optier-icons").removeClass('ui-btn-up-b').addClass('ui-btn-up-a');
	$("#footer-list .optier-icons." + this.id).removeClass('ui-btn-up-a').addClass('ui-btn-up-b');
	linkedin = new RSSFeedContainer("linkedin", $("#linkedin-container"));
	linkedin.fetch();
	twitter = new RSSFeedContainer("twitter", $("#twitter-container"));
	twitter.fetch();
	youtube = new RSSFeedContainer("youtube", $("#youtube-container"));
	youtube.fetch();
	blog = new RSSFeedContainer("blog", $("#blog-container"));
	blog.fetch();

});
