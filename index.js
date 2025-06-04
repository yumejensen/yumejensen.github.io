$(() => {
  const $page = $('#all-contents'); // everything in the body of twiddler.html
  const $tweetsDiv = $('<div class="tweets"></div>'); // div that holds all the tweets
  $page.append($tweetsDiv); // add div that holds tweets to the body of twiddler.html


// streams.home array holds objects that look like:
// {user: 'shawndrost', message: 'just enjoyed an entire city #sf', created_at: Wed Jun 04 2025 11:03:43 GMT-0500 (Central Daylight Time)}
  
function addNewTweets(){ // putting map into a function
  // map over streams.home array to modify individual tweets
  const $tweets = streams.home.map((tweet) => {
    // username needs to be in its own tag so that it's clickable

    const $tweet = $('<div class="tweet"></div>');
    // text variable holds @user and their message
    // content of $tweet will be contents of text variable
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    // you will need to edit this to add timestamp stuff and get the right set up for tweets
    return $tweet;
  });
  $tweetsDiv.append($tweets); // adding tweets to tweetsDiv
}
addNewTweets() // calling function for adding tweets ^^^

  // create a button and add it to the $page (doNot add it to $tweetsDiv)

  // when showing new tweets, can remove the tweets that are already on the page and then add the tweets back
  // look up jQuery methods that will clear an element/tag - the tag that you would clear is the $tweetsDiv

});
