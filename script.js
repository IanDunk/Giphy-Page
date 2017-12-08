function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}


function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
    // constructing URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WOaFdtza6XVcrCuwcwTMkOM7JLBjEY1v&q=" + animal + "&limit=25&offset=0&rating=PG&lang=en"; // part after animal may not be needed
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        // Clearing animals-view
        $("#animals-view").empty();
        // Loop to make 10 gifs
        for (var i = 0; i < 10; i++) {
            var animalDiv = $("<div class='animalGif img-thumbnail'>");
            
            var pTitle = response.data[i].slug;
            if(pTitle.indexOf("-") === -1) {
                pTitle = "Untitled";
            } else {
                pTitle = pTitle.slice(0, pTitle.lastIndexOf("-"));
                pTitle = pTitle.replace(/-/g, " "); // replace globally all "-" with " "
                pTitle = pTitle.toTitleCase(); // make title to title case
            }
            
            var pRating = response.data[i].rating;
            var pFull = $("<div class 'caption'>").text(pTitle + " - Rated: " + pRating);
            
            animalDiv.append(pFull); // PANEL HEADING
           
            var pGif = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
            pGif.attr("data-reverse", response.data[i].images.fixed_height.url);
            animalDiv.append(pGif);  // PANEL BODY
            $("#animals-view").append(animalDiv);
        }
    });
}

// Doesn't work with index.html when transfered to this page?