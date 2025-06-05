$(() => {
  // streams.home array holds objects that look like:
  // {user: 'shawndrost', message: 'just enjoyed an entire city #sf', created_at: Wed Jun 04 2025 11:03:43 GMT-0500 (Central Daylight Time)}
  
  const $page = $('#all-contents'); // everything in the body of twiddler.html
  const $tweetsDiv = $('<div class="tweets"></div>'); // div that holds all the tweets
  $page.append($tweetsDiv); // add div that holds tweets to the body of twiddler.html

  // HEADER OF WEB-PAGE
  const $topOfPage = $('<h1 id="header">YUME TWIDDLER PAGE!</h1>');
    //prepend to main page
    $page.prepend($topOfPage);

  // BUTTON TO REFRESH TWEETS
  const $refreshButton = $('<button id="new-tweets-button">REFRESH TWEETS</button>');
    // insert button after header
    $refreshButton.insertAfter($topOfPage);
  
  // FORM TO ADD TWEETS -------------------------------------------------------------------------------------------------------
  const $inputTweet = $('<form id="input-tweet"></form>');
  // $inputTweet.insertAfter($refreshButton);
  // // append nameInput and messageInput into form
  // $inputTweet.append($nameInput);
  // $inputTweet.append($messageInput);
  //   // username input div
  //   const $nameInput = $('<div class="input"></div>');
  //   // append label to $nameInput
  //     $nameInput.append($('<input type="text"></input>'))

  //   // message input div
  //   const $messageInput = $('<div class="input"></div>');
  
  // ---------------------------------------------------------------------------------------------------------------------------

    //pend an input into the form
    const $userInput = $('<input type="text"></input>');
    $inputTweet.append($userInput);
    // insert this after refresh button
    $inputTweet.insertAfter($refreshButton);
 
  // FUNCTION TO ADD TWEETS ----------------------------------------------------------------------------------------------------- 
  // array param to make function re-usable
  function addNewTweets(array){ // putting map into a function
    // map over streams.home array to modify individual tweets (in reverse to display most recent first)
    const $tweets = array.toReversed().map((tweet) => {
      // tweet div to hold tweet inside
      const $tweet = $('<div class="tweet"></div>');

      //USERNAME + CLICK ON USERNAME TO SEE TIMELINE ----------------------------------
      // username (class username) button
      const username = tweet.user;
      const $username = $(`<button class="username">@${username}</button>`);
      // when usename is clicked
      $username.on('click', () => {
        // remove tweets already ON page currently
        $tweetsDiv.empty();
        // calls addTweets with that specific user input
        addNewTweets(streams.users[username]);
      }) //----------------------------------------------------------------------------

      // message div (class message)
      const $message = $(`<div class="message">${tweet.message}</div>`);

      // human friendly time div (class humanFriendlyTimestamp)
      // make human friendly time with format "x seconds ago" "x minutes ago"
      const timeAgo = moment(tweet.created_at).fromNow();
        //humanFriendlyTimestamp div
        const $timesince = $(`<div class="humanFriendlyTimestamp">(${timeAgo})</div>`);

      // timestamp div (class timestamp)
        // make current date with format June 4th 2025, 3:43:10 pm
      const timeNow = moment().format("MMMM Do YYYY, h:mm:ss a");
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
  }; // -----------------------------------------------------------------------------------------------------------------------
  addNewTweets(streams.home); // CALL ADD TWEETS 


  // CLICK HANDLER ON REFRESH TWEETS BUTTON -----------------------------------------------------------------------------------
  $refreshButton.on('click', () => {
    // remove tweets already ON page currently
    $tweetsDiv.empty();
    // call addNewTweets function to refresh
    addNewTweets(streams.home);
  })
  //----------------------------------------------------------------------------------------------------------------------------



}); // don't delete this 
