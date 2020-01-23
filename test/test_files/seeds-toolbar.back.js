/**
 * @file
 * Provides the last link to go back in admin theme, Inspired by admin Toolbar Anti Flicker.
 */

(function ($, Drupal, drupalSettings) {

    'use strict';

    // Get the path to know if the current page is admin related.
    var drupalPath = drupalSettings.path;
    var storageLink = sessionStorage.getItem('seedsToolbar');
    var lastLink = window.location;

    if (!drupalPath.currentPathIsAdmin) {
      sessionStorage.setItem('seedsToolbar', lastLink);
    }

    /**
     * Replaces the "Home" link with "Back to site" link.
     *
     * @type {Drupal~behavior}
    */
    Drupal.behaviors.backToSite = {
      attach: function () {
        var homeTooltab = $('.home-toolbar-tab a').once('escapeAdmin');
        if (homeTooltab.length) {
          if (storageLink !== null) {
            homeTooltab.attr('href', storageLink);
          }
        }
      }
    };

  })(jQuery, Drupal, drupalSettings);
