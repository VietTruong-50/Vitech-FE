$(function () {
  $(".navbar-nav").on("click", "li", function () {
    $(".navbar-nav li").removeClass("active");
    $(this).addClass("active");
  });

  $(".tab-nav").on("click", "li", function () {
    $(".tab-nav li").removeClass("active");
    $(this).addClass("active");
  });
});

$(function () {
  $("#button").on("click", function () {
    event.preventDefault();
    alert("click step2");
  });
});
