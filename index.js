$(() => {
  const $page = $('#all-contents');

  const $tweetsDiv = $('<div class="tweets"></div>');

  $page.append($tweetsDiv);

  
  // put the map into the function
function addNewTweets(){
  // you will need to edit this to add timestamp stuff and get the right set up for tweets
  const $tweets = streams.home.map((tweet) => {
    // username needs to be in its own tag so that it's clickable
    const $tweet = $('<div class="tweet"></div>');
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $tweetsDiv.append($tweets); // adding tweets to tweetsDiv
}
addNewTweets() // calling function for map to make it show up

  // create a button and add it to the $page (doNot add it to $tweetsDiv)

  // when showing new tweets, can remove the tweets that are already on the page and then add the tweets back
  // look up jQuery methods that will clear an element/tag - the tag that you would clear is the $tweetsDiv

});
