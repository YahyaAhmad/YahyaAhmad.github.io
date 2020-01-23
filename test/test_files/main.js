/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {
  var controller = new ScrollMagic.Controller();
  ("use strict");

  Drupal.behaviors.apn = {
    attach: function(context, settings) {
      if (
        $(
          ".node--type-photo-gallery.node--view-mode-full .field--name-field-gallery"
        ).length &&
        $(".field--name-field-gallery >.field__item").length >= 2
      ) {
        // Sort the layout of field_gallery using isotope.
        $(window).on('load', function () {
          $(".field--name-field-gallery")
          .once("apn")
          .isotope({
            itemSelector: ".field__item"
          });
        });
      }
      var full_body = $(".node--type-program.node--view-mode-full .full_body");
      full_body.css("display", "none");
      $(".read-more-programmes")
        .once("apn")
        .on("click", function(event) {
          event.preventDefault();
          full_body.slideToggle();
          $(this).toggleClass("opened");
          if ($(this).hasClass("opened")) {
            $(this).text(Drupal.t("Read Less"));
          } else {
            $(this).text(Drupal.t("Read More"));
          }
        });

      // Expand search form when clicking on search icon
      $("#block-search")
        .once("apn")
        .on("click", function() {
          event.preventDefault();
          $("#block-searchform").slideToggle();
        });

      // Add parallax
      $(".parallax")
        .once("apn")
        .each(function() {
          createParallax(this, $(this).find("img"));
        });

      // Dropdown icon click
      $(".dropdown-icon").once("apn").on("click", function(event) {
        event.preventDefault();
        $(this)
          .toggleClass("fa-angle-down")
          .toggleClass("fa-angle-up")
          .parent()
          .next()
          .toggleClass("show");
      });
      let lang = $('html').attr('lang');
        $('.copy').on('click', function () {
        $('#page-wrapper').find('.contextual').remove();
        $('.menu--news-letter-menu').find('#block-newslettermenu-menu').remove();
        $('button.copy').remove();
        $('div.copy').remove();
        $('#copy-source').remove();
        let page = $('#page-wrapper').clone().prop('outerHTML');
        let style = $("#inline-style").clone();
        let txt = $('<textarea id ="copy-source"></textarea>');

        txt.text(`
        <html lang = "${lang}">
        <head><style>${style.html()}</style>
        </head><body>
        ${page}
        </body></html>
        `);
        $('body').append(txt);
        $('#copy-source').select();
        document.execCommand("copy");
        $('#copy-source').remove();
        $('.attachment .view-header').prepend('<button class="copy">copy source</button>')
      })
    }
  };
  function createParallax(trigger, el) {
    var tween = TweenMax.to(el, 1, {
      top: 400,
      position: "relative",
      ease: Linear.easeNone
    });
    var scene = new ScrollMagic.Scene({
      triggerElement: trigger,
      duration: "100%"
    })
      .setTween(tween)
      .triggerHook(0)
      .addTo(controller);
  }
})(jQuery, Drupal);
