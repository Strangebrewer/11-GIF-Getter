window.onload = function () {

  var btnArray = ["Tyrion Lannister", "Daenerys Targaryen", "Jon Snow", "Cersei Lannister", "Arya Stark", "Jaime Lannister", "Tormund Giantsbane", "White Walkers", "King in the North"];
  var results;

  $("#btn-container").on("click", ".gif-btn", function () {
    $("#gif-container").html("");

    var searchTerm = $(this).html();
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=lkKiHfTm71E2Np6Xeo8gBaFUMnmO8ntF&q=" + searchTerm + "&limit=10&offset=0&rating=pg&lang=en";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function (response) {
      results = response.data;
      for (i = 0; i < results.length; i++) { 
        var gifDiv = $("<div>");
        var imgRating = $("<p>").text("Rating: " + results[i].rating);
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("class", "gif");
        gifImage.attr("animate", "off");
        gifImage.attr("value", i);
        gifDiv.append(imgRating);
        gifDiv.append(gifImage);
        $("#gif-container").append(gifDiv);
      }
    });
  });

  $("#gif-container").on("click", ".gif", function () {
    if ($(this).attr("animate") === "off") {
      $(this).attr("src", results[$(this).attr("value")].images.fixed_height.url);
      $(this).attr("animate", "on");
    } else {
      $(this).attr("src", results[$(this).attr("value")].images.fixed_height_still.url);
      $(this).attr("animate", "off");
    }
  });

  $("#form-btn").on("click", function () {
    if ($("#new-btn").val() === "") {
      alert("You cannot create an empty button. Please try again.");
    } else if ($("#new-btn").val().trim() === "") {
      alert("You must enter more than just spaces. Please try again.");
    } else if ((btnArray.includes($("#new-btn").val()))) {
      alert("That button already exists. Please try again.");
      $("#new-btn").val("");
    } else {
      btnArray.push($("#new-btn").val().trim());
      $("#btn-container").html("");
      createButtons();
      $("#new-btn").val("");
    }
  });

  function createButtons() {
    for (i = 0; i < btnArray.length; i++) {
      var btn = $("<button>");
      btn.attr("class", "gif-btn");
      btn.text(btnArray[i]);
      $("#btn-container").prepend(btn);
    };
  };

  createButtons();

};