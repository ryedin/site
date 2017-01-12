
// Logging function that accounts for browsers that don't have window.console
function log(){
  log.history = log.history || [];
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments)[0] );
  }
}


  //(function(){
    //'use strict';
    //log("in focus-search-box.js");

    //$( document ).ready(function() {
      //$( "input#aa-search-input.aa-input-search.aa-input" ).focus();
    //});

  //})();

$(document).keypress(function(e) {
  log(e.charCode);
  if(e.charCode == 47) {
    log("got charCode 47!!");
    $( "input#aa-search-input.aa-input-search.aa-input" ).focus();

    //$( "input#aa-search-input.aa-input-search.aa-input" ).focus(function(){
        //$(this).focus();
        //$(this).val('mraaaa');
        //log("arr");
    //});
  }
});

//$('input:text').focus(
    //function(){
        //log("input:text is focused");
        //$(this).val('');
    //});


//$( "input#aa-search-input.aa-input-search.aa-input" ).focus(function() {
    //log("we're focused!");
    //log(this.value);
    //if (this.value === "/") {
        //this.value = '';
    //}
//});
