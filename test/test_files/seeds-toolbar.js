/**
 * @file
 */

(function ($, Drupal, drupalSettings) {
  'use strict';

  var direction;
  var seedsToobarLogo;

  var adjustToolbarWidth = function () {
    $('#toolbar-administration .seeds-toolbar-background').css('min-width', getToolbarWidth(true));
    $('body').css('margin-' + direction, getToolbarWidth());
    if ($('.toolbar-tray.shown').length) {
      $(seedsToobarLogo).width(getToolbarMenuWidth(true));
      $(seedsToobarLogo).css(direction, $('#toolbar-bar').width());
    }
  }

  var openMenu = function (menu) {
    // If the tab that was click doesn't have a menu/tray, assume that the toolbar was closed.
    if (menu.length) {
      closeMenu('.toolbar-tray.shown', false);
      $('body').addClass('seeds-toolbar-open');
    }
else {
      closeMenu('.toolbar-tray.shown');
    }
    $(menu).attr('style', "".concat(direction, ": ").concat($('#toolbar-bar').width(), "px !important")).addClass('shown');
    $('#toolbar-administration').addClass('toolbar-open');
    adjustToolbarWidth();
  }

  var closeMenu = function closeMenu(menu) {
    var totallyClosed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (totallyClosed) {
      $('body').removeClass('seeds-toolbar-open');
    }
    $('.seeds-toolbar-background').removeClass('no-transition');
    if ($('.toolbar-tray.shown').length) {
      $(seedsToobarLogo).css(direction, -getToolbarMenuWidth(true));
    }
    $(menu).attr('style', "".concat(direction, ": ").concat(-$(menu).width(), "px !important")).removeClass('shown');
    $('#toolbar-administration').removeClass('toolbar-open');
    adjustToolbarWidth();
  }

  var getToolbarMenuWidth = function getToolbarMenuWidth(unfiltered) {
    return isMobile() && !unfiltered ? 0 : $('.toolbar-tray.shown').width() || 0;
  };

  var getToolbarWidth = function getToolbarWidth() {
    var unfiltered = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return getToolbarMenuWidth(unfiltered) + $('#toolbar-bar').width();
  };

  var isMobile = function () {
    return $('.mobile-indicator').is(':hidden');
  }

  Drupal.behaviors.seedsToolbar = {
    attach: function (context, settings) {
      if (context == document) {
        direction = $('html').attr('dir') == 'rtl' ? 'right' : 'left';
        seedsToobarLogo = $('.toolbar-menu-administration>ul>li').first();
        // Initialize width on toolbar.
        if (!drupalSettings.seeds_toolbar.compact && !isMobile()) {
          var tray = $('#toolbar-item-administration').attr('data-toolbar-tray');
          openMenu($('#' + tray));
        }
        adjustToolbarWidth();

        // Remove toolbar core classes as a fallback. ( Should be removed from backend, but because the config needs to be exported and the cache needs to be cleared first. )
        $('body').removeClass('toolbar-horizontal', 'toolbar-tray-open');

        // Open child menu'.
                $('.toolbar-menu-administration>ul li>a+.seeds-expand-item').once('seedsToolbar').click(function (event) {
          var parentItem = $(this).parent();
          // Remove transition from seeds-background to prevent out-of-sync behaviors.
          $('.seeds-toolbar-background').addClass('no-transition');
          // Close other items if the first level icons were clicked.
          if (parentItem.parent().parent().hasClass('toolbar-menu-administration')) {
            $('.toolbar-menu-administration>ul>li').not(parentItem).removeClass('mobile-open');
          }
          if (isMobile()) {
            event.preventDefault();
            parentItem.toggleClass('mobile-open');
            adjustToolbarWidth();
          }
        });

                $('.toolbar-fixed-help-item > a').once('seedsToolbar').click(function (event) {
          if (isMobile()) {
            // The ability to clear the cache in mobile.
            event.preventDefault();
          }
        });

        // Toolbar tabs click.
                $('.toolbar-tab>button,.toolbar-tab>a:not(.toolbar-icon-escape-admin,#toolbar-item-administration-search)').once('seedsToolbar').click(function (e) {
          if ($(e.target).hasClass('trigger')) {
            e.preventDefault();
          }
          var tray = $(e.target).nextAll('.toolbar-tray');
          if ($(tray).hasClass('shown')) {
            closeMenu(tray);
          }
else {
            openMenu(tray);
          }
        });

        // Clicking on responsive preview item closes the menu.
                $('#responsive-preview-toolbar-tab ul button').once('seedsToolbar').click(function () {
          closeMenu('.toolbar-tray.shown');
        });

                $('#toolbar-item-administration-search').once('seedsToolbar').click(function (event) {
          // Show the search overlay on click, then empty the input and focus it.
          event.preventDefault();
          $(this).next().children().first().toggleClass('shown').find('#admin-toolbar-search-input').val('').focus();

        });

                $('#toolbar-item-administration-search-tray .toolbar-lining').once('seedsToolbar').click(function () {
          // Close the overlay when clicking on it.
          $(this).removeClass('shown');
        });

        $(document).keydown(function (event) {
          // Close the overlay using the 'Esc' button.
          if (event.which == 27) {
            $('#toolbar-item-administration-search-tray .toolbar-lining').removeClass('shown');
          }
        });

                $('#admin-toolbar-search-input').once('seedsToolbar').click(function (event) {
          // Don't close the overlay when clicking the search input.
          event.stopPropagation();
        });

        $('.dialog-off-canvas-main-canvas').on('touchstart', function (event) {
          if (isMobile()) {
            closeMenu('.toolbar-tray.shown');
          }
        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
