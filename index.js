$(() => {
  // streams.home array holds objects that look like:
  // {user: 'shawndrost', message: 'just enjoyed an entire city #sf', created_at: Wed Jun 04 2025 11:03:43 GMT-0500 (Central Daylight Time)}
  // set value for window.visitor
  window.visitor = "guest"

  const $page = $('#all-contents'); // everything in the body of twiddler.html
  const $tweetsDiv = $('<div class="tweets"></div>'); // div that holds all the tweets
  $page.append($tweetsDiv); // add div that holds tweets to the body of twiddler.html

  // HEADER OF WEB-PAGE
  const $topOfPage = $('<h1 id="header">TWIDDLER!</h1>');
    //prepend to main page
    $page.prepend($topOfPage);

  // BUTTON TO REFRESH TWEETS
  const $refreshButton = $('<button id="new-tweets-button">refresh twids</button>');
    // insert button after header
    $refreshButton.insertAfter($topOfPage);
  
  // FORM TO ADD TWEETS -------------------------------------------------------------------------------------------------------
  const $inputTweet = $('<form id="input-tweet"></form>');
    // insert form after the refresh button
    $inputTweet.insertAfter($refreshButton);
  // Form header
  $inputTweet.append($('<h1 id="input-form-title">Write a twid!</h1>'))

  // // ENTER USERNAME
  // const $userInputDiv = $('<div id="input-username"></div>');
  //   // append div to form
  //   $inputTweet.append($userInputDiv);
  //   // append user input stuff inside user input div
  //   $userInputDiv
  //     .append($('<label for="userInput"> name:</label>'))
  //     .append($('<input type="text" id="username-box"></input>'));

  // ENTER MESSAGE
  const $messageInputDiv = $('<div id="input-message"></div>'); 
    // append div into form
    $inputTweet.append($messageInputDiv);
    // append user message stuff inside message input div
    $messageInputDiv
      .append($('<label for="userMsg"> message:</label>'))
      .append($('<input type="text" id="message-input"></input>'));

   // ---------------------------------------------------------------------------------------------------------------------------
  
  // // SUBMIT BUTTON ON FORM + CLICK HANDLER
  // const $messageSubmit = $('<button id="submit-button">post twid</button>');
  //   // add button after form
  //   $messageSubmit.insertAfter($inputTweet);
  //   //click function
  //   $messageSubmit.on('click', () => {
  //     let $message = $("#input-message").val();

  //     const writeTweet = ($message) => {
  //       const visitor = window.visitor;

  //       if (!visitor) {
  //         throw new Error('Set the global visitor property!');
  //       }

  //       const tweet = {
  //         user: visitor,
  //         message: $message,
  //       };
  //       addNewTweets(tweet);
  //     };
  //     return writeTweet;
  //   })

 
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
      }) //-----------------------------------------------------------------------------

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
  }; // ------------------------------------------------------------------------------------------------------------------------
  addNewTweets(streams.home); // CALL ADD TWEETS 


  // CLICK HANDLER ON REFRESH TWEETS BUTTON ------------------------------------------------------------------------------------
  $refreshButton.on('click', () => {
    // remove tweets already ON page currently
    $tweetsDiv.empty();
    // call addNewTweets function to refresh
    addNewTweets(streams.home);
  })
  

  // SUBMIT BUTTON ON FORM + CLICK HANDLER --------------------------------------------------------------------------------------
  const $messageSubmit = $('<input id="submit-button" type="submit" value="hi">post twid</input>');
    // add button after form
    $messageSubmit.insertAfter($inputTweet);

    //click function
    $messageSubmit.on('click', () => {
      let $message = $("#message-input").val();
      // add guests to users object from data-generator
      streams.users.guest = [];
      // call write tweet function with message input
      writeTweet($message);
      // empty old tweets
      $tweetsDiv.empty();
      addNewTweets(streams.home);
    })
  
  
  // STYLING! -------------------------------------------------------------------------------------------------------------------
  // general page
  $('#all-contents').css({
    "background-color": "rgb(255, 241, 118)",
    "padding-left": "30px",
    "padding-right": "30px",
    "padding-top": "30px",
    "padding-bottom": "50px"
    })
  // header
  $('#header').css({
     "font-size": "28px" 
  })
  //tweets div
  $('.tweets').css({
    "background-color": "rgb(255, 204, 110)"
  })
  // -----------------------------------------------------------------------------------------------------------------------------
  
}); // don't delete this 
