$(() => {
  const $page = $('#all-contents'); // everything in the body of twiddler.html
  const $tweetsDiv = $('<div class="tweets"></div>'); // div that holds all the tweets
  $page.append($tweetsDiv); // add div that holds tweets to the body of twiddler.html


// streams.home array holds objects that look like:
// {user: 'shawndrost', message: 'just enjoyed an entire city #sf', created_at: Wed Jun 04 2025 11:03:43 GMT-0500 (Central Daylight Time)}
  
// array param to make function re-usable
function addNewTweets(array){ // putting map into a function
  // map over streams.home array to modify individual tweets
  const $tweets = array.map((tweet) => {
    // create div to hold tweets inside
    const $tweet = $('<div class="tweet"></div>');

    // username needs to be in its own tag - class "username" to be clickable
    const $username = $(`<div class="username">${tweet.user}</div>`);
      // needs a click function to show tweet history

    //create a tag with message inside
    const $message = $(`<div class="message">${tweet.message}</div>`);

    //create div with time in human friendly way
      // make human friendly time with format "x seconds ago" "x minutes ago"
    const timeAgo = moment(tweet.created_at).fromNow();
    //humanFriendlyTimestamp
    const $timesince = $(`<div class="humanFriendlyTimestamp">(${timeAgo})</div>`);

    //create div to hold timestamp inside with class timestamp
      // make current date with format June 4th 2025, 3:43:10 pm
    const timeNow = moment().format("MMMM Do YYYY, h:mm:ss a")
    const $timestamp = $(`<div class="timestamp">${timeNow}</div>`);


    // append all necessary things to $tweet
    $tweet.append($username);
    $tweet.append($message);
    $tweet.append($timesince);
    $tweet.append($timestamp);
    

    return $tweet;
  });
  $tweetsDiv.append($tweets); // adding individual tweets to tweetsDiv
};
addNewTweets(streams.home); // calling function for adding tweets ^^^

console.log(moment())
// create a button and add it to the $page (doNot add it to $tweetsDiv)
  // click handler will use addNewTweets to refresh new tweets

  // when showing new tweets, can remove the tweets that are already on the page and then add the tweets back
  // look up jQuery methods that will clear an element/tag - the tag that you would clear is the $tweetsDiv

});
