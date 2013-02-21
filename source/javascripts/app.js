//Third Parties
//=require vendor/jquery-1.9.1.min
//=require vendor/jquery-migrate-1.1.1.min
//require vendor/jquery-1.6.4.min
//=require vendor/jquery.mobile-1.1.0.min
//=require plugins
//=require vendor/handlebars
//=require vendor/add2home


//=require RSSFeedContainer


//$(document).ready(function(){
$(document).delegate('.ui-page', 'pageshow', function () {
    //Your code for each page load here
	var linkedin = new RSSFeedContainer("linkedin", $("#linkedin-container"))
				.fetch();

	var twitter = new RSSFeedContainer("twitter", $("#twitter-container"))
	     		.fetch();
	
});