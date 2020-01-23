import { CountUp } from "/libraries/countup.js/dist/countUp.js";
var countedUp = false;
(function($, Drupal) {
  Drupal.behaviors.count = {
    attach: function(context, settings) {
      // Count up.
      const content = $(".fact-body");
      if (!content.length) return;

      $(document).on("scroll", function() {
        var scrolled = document.scrollingElement.scrollTop;
        var position = content.offset().top;
        if (scrolled > position - $(window).height() + 100) {
          loadCountUp();
          countedUp = false;
        }
      });
    }
  };

  function loadCountUp() {
    $(".fact-body .fact-wrapper")
      .once("count")
      .each(function() {
        var el = $(".field--name-field-integer", this);
        var value = el.html().replace(/\,/g,'');
        var countUp = new CountUp(el[0], value);
        countUp.start();
      });
  }
})(jQuery, Drupal);
