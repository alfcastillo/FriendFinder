// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

// var express = require("express");
// var bodyParser = require("body-parser");
// var path = require("path");

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friend");
// var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/friends they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out the Survey... this data is then sent to the server...
  // Then the server saves the data to the newSurvey array)
  // ---------------------------------------------------------------------------
            

  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newSurvey = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log("\nFriend data from Post request",newSurvey);
  
    friendData.push(newSurvey);
    // Calculate totalDifference for best Friend match
    var totalDifference=[];
    var bestMatch=0;
    var friendScore = 0;
    console.log("Friend Database count: ",friendData.length);
    for (var i=0;i<friendData.length-1;i++){
      var difference = 0;
      console.log("\n**** Processing match compatilibity with Friend-->",i);
      for (var j=0;j<10;j++){
        friendScore = parseInt(friendData[i].scores[j]);
        console.log("Friend Score: ",friendScore);
        difference = difference + Math.abs(parseInt(friendScore)-parseInt(newSurvey.scores[j]));
        totalDifference[i] = difference;
        console.log("Partial Total Difference: ",totalDifference[i]);
      }
      console.log("Total Difference for Friend #",i,"-->", totalDifference[i]);
    }
    bestMatch = Math.min.apply(Math, totalDifference); 
    var bestMatchIndex = totalDifference.indexOf(bestMatch);
    console.log("\n****************************")
    console.log("Best Match for ",newSurvey.name," is-->",friendData[bestMatchIndex].name, bestMatch);

    // res.json(newSurvey);
    res.json(friendData[bestMatchIndex]);
  });
};
