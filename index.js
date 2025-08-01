$(() => {
  // streams.home array holds objects that look like:
  // {user: 'shawndrost', message: 'just enjoyed an entire city #sf', created_at: Wed Jun 04 2025 11:03:43 GMT-0500 (Central Daylight Time)}

  // set value for window.visitor
  window.visitor = "anonymousduck"

  const $page = $('#all-contents'); // everything in the body of twiddler.html
  const $tweetsDiv = $('<div class="tweets"></div>'); // div that holds all the tweets
  $page.append($tweetsDiv); // add div that holds tweets to the body of twiddler.html


  // HEADER OF WEB-PAGE
  const $topOfPage = $('<h1 id="header">DUCKLER!</h1>');
    //prepend to main page
   $page.prepend($topOfPage);
  

  // DUCK IMAGE - make it a span element
  const $duckler = $('<span id="duckler-span"><img src="images/DUCKLER.PNG" id="duckler"/></span>');
    // LOCATION OF DUCK
    $page.append($duckler)
    // DUCK STYLE
    $('#duckler').css({
      "display": "inline-block",
      //"max-width": "350px",
      "max-width": "40%",
    })


  // BUTTON TO REFRESH TWEETS
  const $refreshButton = $('<button id="new-tweets-button" class="topBtn">refresh quacks</button>');
    // insert button after header
    $refreshButton.insertAfter($topOfPage);
    

  // FORM TO ADD TWEETS -------------------------------------------------------------------------------------------------------
  const $inputTweet = $('<form id="input-tweet"></form>');
    // insert form after the refresh button
    $inputTweet.insertAfter($refreshButton);
  // Form header
  $inputTweet.append($('<h1 id="input-form-title">Write a quack!</h1>'))

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
      .append($('<label for="userMsg"> message: </label>'))
      .append($('<input type="text" id="message-input"></input>'));

   // ---------------------------------------------------------------------------------------------------------------------------



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
        //quack audio
        var audio = new Audio('quacky/single-quack-from-a-duck.wav');
        // play audio on click!
        audio.play();
        
        // remove tweets already ON page currently
        $tweetsDiv.empty();
        // calls addTweets with that specific user input
        addNewTweets(streams.users[username]);

        // CSS STYLING ------ keeps after refresh ----
        $('.tweet').css({
          "color": "black",
          "margin-bottom": "15px", // space under
          "background-color": "rgb(255, 200, 47)", // bg color
          "border-radius": "10px", // rounded corners
          "border-style": "dashed", // add border
          "border-width": "2px",
          "border-color": "rgb(219, 87, 11)",
          "padding-left": "15px", // spacing around content
          "padding-right": "15px",
          "padding-top": "8px",
          "padding-bottom": "15px",
        })
        // username button
        $('.username').css({
          "color": "black",
          "background-color": "rgb(255, 253, 121)",
          "border-style": "solid",
          "border-color": "rgb(219, 87, 11)",
          "border-radius": "7px"
        })
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
    //quack audio
    var audio = new Audio('quacky/single-quack-from-a-duck.wav');
    // play audio on click!
    audio.play();

    // remove tweets already ON page currently
    $tweetsDiv.empty();
    // call addNewTweets function to refresh
    addNewTweets(streams.home);

    // CSS STYLING ------ keeps after refresh ----
    // each tweet
    // each tweet
    $('.tweet').css({
      "color": "black",
      "margin-bottom": "15px", // space under
      "background-color": "rgb(255, 200, 47)", // bg color
      "border-radius": "10px", // rounded corners
      "border-style": "dashed", // add border
      "border-width": "2px",
      "border-color": "rgb(219, 87, 11)",
      "padding-left": "15px", // spacing around content
      "padding-right": "15px",
      "padding-top": "8px",
      "padding-bottom": "15px",
    })
    // username button
    $('.username').css({
      "color": "black",
      "background-color": "rgb(255, 253, 121)",
      "border-style": "solid",
      "border-color": "rgb(219, 87, 11)",
      "border-radius": "7px"
    })
    //---------------------------------------------
  })
  


  // SUBMIT BUTTON ON FORM + CLICK HANDLER --------------------------------------------------------------------------------------
  const $messageSubmit = $('<input id="submit-button" class="topBtn" type="submit" value="post quack">');
    // add button after form
    $messageSubmit.insertAfter($inputTweet);

    //click function
    $messageSubmit.on('click', () => {
      //quack audio
      var audio = new Audio('quacky/single-quack-from-a-duck.wav');
      // play audio on click!
      audio.play();

      // get text value of message
      let $message = $("#message-input").val();
      // add guests to users object from data-generator
      streams.users.anonymousduck = [];
      // call write tweet function with message input
      writeTweet($message);
      // empty old tweets
      $tweetsDiv.empty();
      addNewTweets(streams.home);

      // CSS STYLING ------ keeps after refresh ----
      // each tweet
      // each tweet
      $('.tweet').css({
        "color": "black",
        "margin-bottom": "15px", // space under
        "background-color": "rgb(255, 200, 47)", // bg color
        "border-radius": "10px", // rounded corners
        "border-style": "dashed", // add border
        "border-width": "2px",
        "border-color": "rgb(219, 87, 11)",
        "padding-left": "15px", // spacing around content
        "padding-right": "15px",
        "padding-top": "8px",
        "padding-bottom": "15px",
      })
      // username button
      $('.username').css({
        "color": "black",
        "background-color": "rgb(255, 253, 121)",
        "border-style": "solid",
        "border-color": "rgb(219, 87, 11)",
        "border-radius": "7px"
      })
      //---------------------------------------------

      // clear form text area
      $('form').find('input, select, textarea').val('');
      
    })
  

  

  // CLICK HANDLER ON DUCKLER IMAGE --------------------------------------------------------------------------------------
  $duckler.on('click', () => {
    // quack audio
    var audio = new Audio('quacky/single-quack-from-a-duck.wav');
    // play audio on click!
    audio.play();
  })

  
  // STYLING! -------------------------------------------------------------------------------------------------------------------
  // general page
  $('#all-contents').css({
    "color": "black",
    "background-color": "rgb(255, 241, 118)",
    "padding-left": "60px",
    "padding-right": "50px",
    "padding-top": "30px",
    "padding-bottom": "50px"
    })
  // duck image
  $('#duckler-span').css({
    'position': 'fixed',
    //'left':'400px',
    'left': '19%',
    'top': '2%'

  })
  // header
  $('#header').css({
     "font-size": "69px",
  })
  // write a twid
  $('#input-form-title').css({
    "font-size": "20px",
  })
  // refresh twids AND post twids buttons
  $('.topBtn').css({
    "color": "black",
    "background-color": "rgb(255, 200, 47)",
    "border-style": "solid",
    "border-width": "3px",
    "border-color": "rgb(219, 87, 11)",
    "border-radius": "7px",
    "padding": "5px" // spacing around content
  })
  // refresh twid button
  $('#new-tweets-button').css({
    "margin-bottom": "20px"
  })

  // form input
  $('#message-input').css({
    "color": "black",
    "background-color": "rgb(255, 250, 185)",
    "border-style": "solid",
    "border-color": "rgb(219, 87, 11)",
    "border-radius": "7px",
    "padding: 15px": "10px",
    "line-height": "200%",
    "margin-bottom": "7px", // space under
  })
  // post twid button
  $('#submit-button').css({
    "margin-top": "10px",
    "margin-bottom": "20px",
    // "background-color": "rgb(255, 200, 47)",
    // "border-color": "rgb(219, 87, 11)",
    // "border-radius": "7px"
  })
  //tweets div
  $('.tweets').css({
    /*"margin-left": "300px",*/
    //"background-color": "rgb(255, 210, 113)"
  })
  // each tweet
  $('.tweet').css({
    "color": "black",
    "margin-bottom": "15px", // space under
    "background-color": "rgb(255, 200, 47)", // bg color
    "border-radius": "10px", // rounded corners
    "border-style": "dashed", // add border
    "border-width": "2px",
    "border-color": "rgb(219, 87, 11)",
    "padding-left": "15px", // spacing around content
    "padding-right": "15px",
    "padding-top": "8px",
    "padding-bottom": "15px",
  })
  // username button
  $('.username').css({
    "color": "black",
    "background-color": "rgb(255, 253, 121)",
    "border-style": "solid",
    "border-color": "rgb(219, 87, 11)",
    "border-radius": "7px"
  })
  // -----------------------------------------------------------------------------------------------------------------------------
  
}); // don't delete this 
