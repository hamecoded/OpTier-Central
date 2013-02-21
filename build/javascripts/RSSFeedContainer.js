/**
 * Wrapper to RSS Feeds
 * @param {[type]} raw  Raw feeds object
 * @param {[String]} type LinkedIn, Facebook, Twitter, YouTube
 */
var RSSFeedContainer=function(e,t){this.type=e,this.container=t,this.url="";var n=$("#rssTmp").html();this.template=Handlebars.compile(n)};RSSFeedContainer.prototype={_getFeeds:function(e,t){var n=this;$.ajax({url:"http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num="+e+"&callback=?&q="+encodeURIComponent(n.url),dataType:"jsonp",type:"GET",timeout:5e3,async:!1,success:function(e){n.feed=e.responseData.feed,t&&t.call(n)},error:function(e){alert("fail"+e)}})},render:function(){var e=this;e.container.append(e.template(e.feed)),$(".rss-container ul li:not('.hidden')").on("click",function(e){alert("item click: "+$(this).data("feeddate"))})},fetch:function(){var e=this;switch(e.type){case"twitter":e.url="http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=optier";break;case"linkedin":e.url="http://www.linkedin.com/rss/nus?key=WhjzfiEewQ2qrnoEyOkma479eb0yRdY7EuwBxi6RremAaY7KBmy394ZUfVuhXxXC7pY",e.url="http://www.linkedin.com/rss/nus?key=tLJNUGbKw896RLjhb3nDKCRswYfy2UUrOjknlFzsS-lAcW5JkZyY4KPeWHRHGE0m-hE";break;case"facebook":e.url="facebook.com"}e._getFeeds(10,e.render)}};