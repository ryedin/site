function inputFocus(){
    'use strict';
    // Focus search field when user types a slash
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var f = document.getElementById("aa-search-input");
    if(keycode == '191' || keycode == '47'){
        f.focus();
    }
 }

 function clearSearch() {
    // Remove the / from the search field
    var f = document.getElementById("aa-search-input");
    if(f.value == "/"){
        f.value = "";
        f.focus();
    }

    // Remove search field focus when user presses <ESC>
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '27') {
        $(document.activeElement).blur();
    }
 }

window.onkeydown = inputFocus;
window.onkeyup = clearSearch;

// Logging function that accounts for browsers that don't have window.console
function log(){
  log.history = log.history || [];
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments)[0] );
  }
}
