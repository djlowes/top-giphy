var topics = ["Bruce Willis", "Nicole Kidman", "John Travolta", "Denzel Washington", "Julia Roberts", "Tom Hanks", "Samuel L Jackson", "Scarlett Johansson", "Angelina Jolie", "George Clooney", "Brad Pitt", "Sandra Bullock"]
var authKey = "k2trtEooeVbLW61C7gpJYzaFTXJhfvzh";


function displayActors() {
var actor = $(this).attr("data-name").split(" ").join("-");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=" + authKey + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(actor)
    console.log(response)
    console.log(queryURL)

$("#left-container").empty();
$("#left-container").css({"border-color": "black", "border-weight":"0.5px", "border-style":"solid"});
var gifDisplay = $("#left-container");
var gifList = response.data;
  for (let i=0; i<gifList.length; i++) {
    var giffyAnimate = gifList[i].images.fixed_width.url;
    var giffyStill = gifList[i].images.fixed_width_still.url;
    var giffy = $("<img>").attr("src", giffyAnimate);
    var giffyState = "animate";
    giffy.addClass("myGiffy");
    giffy.attr("data-animate", giffyAnimate);
    giffy.attr("data-still", giffyStill);
    giffy.attr("data-state", giffyState);
    gifDisplay.append(giffy);
    }

  $(".myGiffy").on("click", function() {
    if (giffyState === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      giffyState = "still";
      return;
    }
    if (giffyState === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      giffyState = "animate";
      return;
    }
});
});
}

function renderButtons() {
$("#top-container").empty();
  for (let i=0; i<topics.length; i++) {
    var b = $("<button>");
      b.addClass("myButton");
      b.attr("data-name", topics[i]);
      b.text(topics[i]);
      $("#top-container").append(b);
      }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var actor = $("#actor-input").val().trim();
  topics.push(actor);
    renderButtons();
});

$(document).on("click", ".myButton", displayActors);
  renderButtons();
