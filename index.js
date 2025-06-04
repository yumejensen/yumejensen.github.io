$(() => {
  const $page = $('#all-contents'); // everything in the body of twiddler.html
  const $tweetsDiv = $('<div class="tweets"></div>'); // div that holds all the tweets
  $page.append($tweetsDiv); // add div that holds tweets to the body of twiddler.html

  //HEADER OF WEB-PAGE - prepend to $page
  const $topOfPage = $('<h1 id="header">YUME TWIDDLER PAGE!</h1>');
    $page.prepend($topOfPage);

  // BUTTON TO REFRESH TWEETS
  const $refreshButton = $('<button id="new-tweets-button">REFRESH TWEETS</button>');
    // insert button after header
    $refreshButton.insertAfter($topOfPage);

// streams.home array holds objects that look like:
// {user: 'shawndrost', message: 'just enjoyed an entire city #sf', created_at: Wed Jun 04 2025 11:03:43 GMT-0500 (Central Daylight Time)}
  
// FUNCTION TO ADD TWEETS ---------------------------------------------------------------------------------- 
// array param to make function re-usable
function addNewTweets(array){ // putting map into a function
  // map over streams.home array to modify individual tweets
  const $tweets = array.toReversed().map((tweet) => {
    // create div to hold tweets inside
    const $tweet = $('<div class="tweet"></div>');

    // username class username div
    const $username = $(`<div class="username">${tweet.user}</div>`);
      // needs a click function to show tweet history
    // make username into a button? 
    const $usernameButton = $(`<button class="users-button">${$username}</button>`);
    // when you click username, show user history
    $usernameButton.on('click', () => {
      $tweetsDiv.empty();
      addNewTweets(streams.users);
    })

    //create a tag with message inside
    const $message = $(`<div class="message">${tweet.message}</div>`);

    //create div with time in human friendly way
    // make human friendly time with format "x seconds ago" "x minutes ago"
    const timeAgo = moment(tweet.created_at).fromNow();
      //humanFriendlyTimestamp div
      const $timesince = $(`<div class="humanFriendlyTimestamp">(${timeAgo})</div>`);

    //create div to hold timestamp inside with class timestamp
      // make current date with format June 4th 2025, 3:43:10 pm
    const timeNow = moment().format("MMMM Do YYYY, h:mm:ss a")
      const $timestamp = $(`<div class="timestamp">${timeNow}</div>`);

    // append all necessary parts to each $tweet
    $tweet.append($username);
    $tweet.append($message);
    $tweet.append($timesince);
    $tweet.append($timestamp);
    // return tweet
    return $tweet;
  });
  // append every individual tweet to the larger tweets div
  $tweetsDiv.append($tweets); 
}; // ------------------------------------------------------------------------------------------------------
addNewTweets(streams.home); // calling function for first time load


// CLICK HANDLER ON NEW TWEETS BUTTON ----------------------------------------------------------------------
$refreshButton.on('click', () => {
  // remove tweets already ON page currently
  //$tweetsDiv.html("");
  $tweetsDiv.empty();
  // call addNewTweets function to refresh
  addNewTweets(streams.home);
})
//----------------------------------------------------------------------------------------------------------


  // when showing new tweets, can remove the tweets that are already on the page and then add the tweets back
  // look up jQuery methods that will clear an element/tag - the tag that you would clear is the $tweetsDiv

});
