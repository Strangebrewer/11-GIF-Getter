window.onload = function () {

  var btnArray = ["House Lannister", "Daenerys Targaryen", "Jon Snow", "King's Landing", "House Stark", "Kingslayer", "Wildlings", "White Walkers", "King in the North"];
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
    var duplicate;
    for (i = 0; i < btnArray.length; i++) {
      if (btnArray[i].toLowerCase() === $("#new-btn-text").val().toLowerCase()) {
        duplicate = btnArray[i].toLowerCase();
      }
    }

    if ($("#new-btn-text").val().trim() === "") {
      $("#new-btn-text").val("");
    } else if (duplicate === $("#new-btn-text").val().toLowerCase()) {
      $("#new-btn-text").val("");
    } else {
      btnArray.push($("#new-btn-text").val().trim());
      $("#btn-container").html("");
      createButtons();
      $("#new-btn-text").val("");
    }
  });

  function createButtons() {
    for (i = 0; i < btnArray.length; i++) {
      var btn = $("<button>");
      btn.attr("class", "gif-btn");
      btn.text(btnArray[i]);
      $("#btn-container").append(btn);
    };
  };

  createButtons();

};