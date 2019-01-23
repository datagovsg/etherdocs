'use strict';

var lastHeight;
var lastWidth;
exports.aceEditEvent = function (event, args, callback) {
    var editbar = $('#editbar');

    var elem = $('iframe[name=ace_outer]').contents().find('iframe[name=ace_inner]');
    var newHeight = elem.outerHeight() + (editbar.length ? editbar.outerHeight() : 0);
    var newWidth = elem.outerWidth();

    if (!lastHeight || !lastWidth || lastHeight !== newHeight || lastWidth !== newWidth) {
        sendResizeMessage(newWidth, newHeight);
    }
    
};

exports.goToRevisionEvent = function (hook_name, context, cb) {
    
    var editbar = $('#timeslider-top')
    var elem = $('#padeditor');

    var newHeight = elem.outerHeight() + (editbar.length ? editbar.outerHeight() : 0);
    var newWidth = elem.outerWidth();

    if (!lastHeight || !lastWidth || lastHeight !== newHeight || lastWidth !== newWidth) {
        sendResizeMessage(newWidth, newHeight);
    }
};

var sendResizeMessage = function (width, height) {
    lastHeight = height;
    lastWidth = width;
    

    window.parent.postMessage({
        name: 'ep_resize',
        data: {
            width:  width,
            height: height
        }
    }, '*');
} 
