// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBlDI89mbE_SdfJPyrY-v6CPLEfhi1ilW8",
    authDomain: "newproject-651c7.firebaseapp.com",
    databaseURL: "https://newproject-651c7.firebaseio.com",
    projectId: "newproject-651c7",
    storageBucket: "newproject-651c7.appspot.com",
    messagingSenderId: "262461235155"
  };
  firebase.initializeApp(config);

$(document).ready(function() {
  var database = firebase.database();
  // create a section for messages data in your db
  var messagesReference = database.ref('messages');
  getFanMessages();

  // CREATE

  $('#message-form').submit(function(event) {
    // by default a form submit reloads the DOM which will subsequently reload all our JS
    // to avoid this we preventDefault()
    event.preventDefault();

    // grab user message input
    var message = $('#message').val();

    // clear message input (for UX purposes)
    $('#message').val('');

    // use the set method to save data to the messages
    messagesReference.push({
      message: message,
      votes: 0
    });
  });

  // READ
  function getFanMessages() {

    messagesReference.on('child_added', function(data){
    var message = (data.val()).message;
    var li = document.createElement("LI");
    var textNode = message + " " + "<button class='btn-delete'>Delete</button>";
    li.innerHTML = textNode;
    document.getElementById("message-board").appendChild(li);
    });

    $(".btn-delete").click(function() {
        messagesReference.remove(function(data) {
          $(this).parent().remove();
      });
    });
  }
});