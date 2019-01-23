'use strict';


/**
 * Etherpad Lite "documentReady" hook
 *
 * Fired ONLY on Pad view and not on timeslider view
 *
 * @see {@link http://etherpad.org/doc/v1.6.1/#index_documentready}
 */
exports.documentReady = function () {
    console.debug('documentReady', window.location.href);

    var $editbar = $('#editbar');
    $('ul.menu_left', $editbar).css('position', 'absolute'); // EP 1.6 introduced "fixed" menus for mobile, override it

    var $popups = $('#users, .popup, .epEmbedFloatingToolbar');

    doPosition($editbar, $popups);
};

/**
 * Etherpad Lite "postTimesliderInit" hook
 *
 * Fired ONLY on timeslider view
 *
 * @see {@link http://etherpad.org/doc/v1.6.1/#index_posttimesliderinit}
 */
exports.postTimesliderInit = function () {
    console.debug('postTimesliderInit', window.location.href);

    var $timeslider = $('#timeslider-top');
    var $popups = $('.popup .epEmbedFloatingToolbar');

    doPosition($timeslider, $popups);
};

/**
 * Position toolbar based on the `ep_embed_floating_toolbar_scroll` postMessage and all popups relative to it.
 *
 * @param {object} $toolbar JQuery object representing the toolbar
 * @param {object} $popups JQuery object representing the popup elements
 */
var doPosition = function ($toolbar, $popups) {
    // Initial values
    $toolbar.css('position', 'fixed');
    $toolbar.css('top', 0);
    $toolbar.css('z-index', 1000);

    $popups.css('top', $toolbar.outerHeight()); // All popups appear under the toolbar

    $(window).on('message onmessage', function (e) {
        var msg = e.originalEvent.data;
        if (msg.name === 'ep_embed_floating_toolbar_scroll') {
            console.log('ep_embed_floating_toolbar_scroll', 'msg received', msg);
            var data = msg.data;

            if (!data.scroll) {
                console.warn('Dropping message, as data.scroll was not present');
                return;
            }

            var diff = data.scroll.top - data.frameOffset.top;
            if (diff > 0) {
                $toolbar.css('top', diff + 'px');
                $popups.css('top', diff + $toolbar.outerHeight() + 'px !important');
            } else {
                $toolbar.css('top', '0');
                $popups.css('top', $toolbar.outerHeight() + 'px !important');
            }
        }
    });
};