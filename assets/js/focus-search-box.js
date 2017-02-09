// Search Box Event Handler

$(document).keydown(function (e) {
    var f = document.getElementById("aa-search-input");
    switch (e.which) {
        // Focus search field when user types defined keys
        case 47:
        case 191:
        case 189:
            if (f !== document.activeElement) {
                event.preventDefault();
                f.focus();
            } else {
                // Close search box if pressed again and field is empty
                if (f.value == '') {
                    f.blur();
                }
            }
            break;
        // Remove search field focus when user presses <ESC>
        case 27:
            f.blur();
            break;
    }
});

// Logging function that accounts for browsers that don't have window.console
function log() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments)[0]);
    }
}