var topics = ["Bruce Willis", "Nicole Kidman", "John Travolta", "Denzel Washington", "Julia Roberts", "Tom Hanks", "Samuel L Jackson", "Scarlett Johansson", "Angelina Jolie", "George Clooney", "Brad Pitt", "Sandra Bullock"]
var authKey = "k2trtEooeVbLW61C7gpJYzaFTXJhfvzh";


function displayActors() {
var actor = $(this).attr("data-name").split(" ").join("-");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=" + authKey + "&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

//    console.log(actor)
    console.log(response)
//    console.log(this)
//    console.log(queryURL)

$("#left-container").empty();
var gifDisplay = $("#left-container");
var gifList = response.data;
  for (let i=0; i<gifList.length; i++) {
    var giffyURL = gifList[i].images.fixed_width.url;
    var giffy = $("<img>").attr("src", giffyURL);
    giffy.addClass("myGiffy");
    gifDisplay.append(giffy);
  }
//var rating


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
