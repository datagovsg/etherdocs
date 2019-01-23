exports.handleMessage = function(payload) {
    if ($('#ep_countable-popup.selected').length !== 0) {
        updateCounter();
    }
}
