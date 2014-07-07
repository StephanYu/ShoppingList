$(document).ready(function() {
  
  
  //if click on submit button 1) add value of input text entries to shopping-item div
  //then 2) make div shopping item appear inside of shopping-list div
  var counter = 0;
  $("#text-input-form").submit(function(event) {
      counter += 1;
      var checkbox = "checkbox" + counter;
      var value = $("#add-item").val(); 
      var quant = $("#quantity").val();
      var measr = $("#measurement").val();
      var string_tot = value + " " + quant + measr;
      $("#shopping-list").append("<div class='shopping-item-container'><div class='shopping-item'><p class='receptor'>" + string_tot + "</p><div class='checkbox'><input type='checkbox' value='1' id='" + checkbox + "'/><label for='" + checkbox + "' class='label'></label></div><i class='fa fa-trash-o'></i><i class='fa fa-bars'></i></div><div class='sub-shopping-item hidden'><form id='sub-shopping-form" + counter + "'><input type='text' name='Note' class='note' placeholder='Note'><input type='date' class='date'></input><i class='fa fa-plus'></i><i class='fa fa-repeat'></i></form><p class='sub-shopping-notefield'></p></div></div>");
      event.preventDefault();
      $("#add-item").val('');
      $("#quantity").val('');
      $("#measurement").val('');
  });

  //if click on checkbox make 1)shopping item grey out and 2)strike-out text item  and 3)move shopping item to bottom of shopping list div
  // $(document).on('click', function(event){   
  //       $(event.target).closest('.receptor').toggleClass('strikethrough');
  // });//Why does the above function not work when I click on the checkbox? It only works when I click on the Item description (.receptor)
  $('#shopping-list').on('click', '.checkbox', function(){
      $(this).closest('.shopping-item p').toggleClass('strikethrough');
  }); //Why does this function not work?

  
  //if click on note logo then make submenu appear/disappear
  // $(".fa-bars").click(function() {
  //   $(this).closest("sub-shopping-item").toggleClass("hidden");
  // }); Why does this not work?

$("#shopping-list").on('click', '.fa-bars', function(){
  $(this).closest(".shopping-item").next().toggleClass("hidden"); //why does it work when i choose #shopping-list but not when I choose .shopping-item-container??
});


  //if click submit2 button then save value of note and date to sub-shopping item which will expand and contract according to content
  $('#shopping-list').on('click','.fa-plus', function(){
    // var value = $(this).closest("sub-shopping-form", "note").val();
    // alert(value);
    $(this).closest(".sub-shopping-item").toggleClass("expand");

  });

  //if click on bin button then remove the current shopping item
  $('#shopping-list').on('click','.fa-trash-o', function(){
      $(this).closest('.shopping-item-container').slideUp('normal');
  });

  

});
  
