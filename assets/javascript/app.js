
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDwvlnL3SYfLf4l9fDJB6gup_X9naBO200",
    authDomain: "train-scheduler-2615b.firebaseapp.com",
    databaseURL: "https://train-scheduler-2615b.firebaseio.com",
    projectId: "train-scheduler-2615b",
    storageBucket: "train-scheduler-2615b.appspot.com",
    messagingSenderId: "505406198851"
  };

  firebase.initializeApp(config);

var database = firebase.database();
    // Initial Values
    var name = "";
    var email = "";
    var age = 0;
    var comment = "";
    // Capture Button Click
    $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      var name = $("#train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var first = $("#first-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      // Code for the push
      database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    database.ref().on("child_added", function(childSnapshot) {

        var tFrequency = parseInt(childSnapshot.val().frequency);
        var first = childSnapshot.val().first;
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // full list of items to the well
      $("#train-table").append("<tr><th>" + childSnapshot.val().name +
        " </th><th> " + childSnapshot.val().destination +
        " </th><th> " + childSnapshot.val().frequency +
        " </th><th> " + moment(nextTrain).format("hh:mm") +
        " </th><th> " + tMinutesTillTrain + " </th><tr>");
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    var tFrequency = 3;
    // Time is 3:30 AM
    var firstTime = "03:30";
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
