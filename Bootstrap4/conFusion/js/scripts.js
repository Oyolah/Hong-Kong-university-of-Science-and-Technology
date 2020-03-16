$(document).ready(function() {
    $("#mycarousel").carousel({ interval: 2000 });
    $("#carouselButton").click(function() {
      if (
        $("#carouselButton")
          .children("span")
          .hasClass("fa-pause")
      ) {
        $("#mycarousel").carousel("pause");
        $("#carouselButton")
          .children("span")
          .removeClass("fa-pause");
        $("#carouselButton")
          .children("span")
          .addClass("fa-play");
      } else if (
        $("#carouselButton")
          .children("span")
          .hasClass("fa-play")
      ) {
        $("#mycarousel").carousel("cycle");
        $("#carouselButton")
          .children("span")
          .removeClass("fa-play");
        $("#carouselButton")
          .children("span")
          .addClass("fa-pause");
      }
    });
  });
  //Displaying the login model
  $("#myLoginModel").click(function() {
    $("#loginModal").modal("show");
  });

  //Displaying the form model
  $("#formModel").click(function() {
    $("#reserveModal").modal("show");
  });