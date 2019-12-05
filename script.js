function next() {
  $(".slider .item.show")
    .removeClass("show")
    .next()
    .addClass("show");
  if (!$(".slider .item").hasClass("show")) {
    $(".slider .item")
      .first()
      .addClass("show");
  }
}

function prev() {
  $(".slider .item.show")
    .removeClass("show")
    .prev()
    .addClass("show");
  if (!$(".slider .item").hasClass("show")) {
    $(".slider .item")
      .last()
      .addClass("show");
  }
}

$(".left").on("click", function() {
  next();
});

$(".right").on("click", function() {
    prev();
});

setInterval(function() {
  next();
}, 2000);
