$(document).ready(function() {
  var counter = 0;
  //if click on submit button 1) add value of text entries to p tag
  //then 2) make div shopping item appear inside of shopping-list div
  $("#text-input-form").submit(function(event) {
      counter += 1;
      var checkbox = "checkbox" + counter;
      var value = $("#add-item").val(); 
      var quant = $("#quantity").val();
      var measr = $("#measurement").val();
      var string_tot = value + " " + quant + measr;
      $("#shopping-list").append("<div class='shopping-item'><p id='receptor'>" + string_tot + "</p><div class='checkbox'><input type='checkbox' value='1' id='" + checkbox + "'/><label for='" + checkbox + "'></label></div><i class='fa fa-trash-o'></i><i class='fa fa-bars'></i></div>");
      event.preventDefault();
  });

  //if click on checkbox make 1)shopping item grey out and 2)strike-out item  and 3)move shopping item to bottom of shopping list div
    
  

  
  //if click on note logo then make accordion submenu appear/disappear

  //if click submit2 button then save value of note and date to sub-shopping item

  

});
  
