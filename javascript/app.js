//Declare variable topics as an array of strings
var topics = ["Horse", "Dog", "Cat", "Bird", "Lion", "Shark", "Monkey", "Zebra"];
//Function to display information from giphy api
function displayInfo() {
    $("#animalsView").empty();
    var animal = $(this).attr("data-name");
    var api = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=PIQriinmDd6I3BCYFj1BxxYS3UrZ3eHp";
    $.ajax({
        url: api,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        //Loop to get 10 static, non-animated gif images from the GIPHY API
        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animalImage = $("<img class='pause'>");
            animalImage.attr({
                src: results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still",
            });
            gifDiv.append(p);
            gifDiv.append(animalImage);
            gifDiv.addClass("gifs");
            $("#animalsView").prepend(gifDiv);
        }
        //When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
        $(".pause").on("click", function() {
            var state = $(this).attr("data-state");
            if (state == "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        })
    })
}
//Render buttons
function renderButtons() {
    $("#buttonsView").empty();
    $.each(topics, function(index, element) {
        var button = $("<button/>").addClass("animal").attr("data-name", element).text(element);
        $("#buttonsView").append(button);
    });
};
$("#addAnimal").on("click", function() {
        var animal = $("#animal-input").val().trim();
        topics.push(animal);
        renderButtons();
        //Clear animal input after submit animal
        $("#animal-input").val("");
        return false;
    })
    //When load page
$(document).on("click", ".animal", displayInfo);
renderButtons();