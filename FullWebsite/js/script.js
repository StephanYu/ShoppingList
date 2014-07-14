
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
      $("#shopping-list").append("<div class='shopping-item-container'><div class='shopping-item'><p class='receptor'>" + string_tot + "</p><div class='checkbox'><input type='checkbox' value='1' id='" + checkbox + "'/><label for='" + checkbox + "' class='label'></label></div><i class='fa fa-trash-o'></i><i class='fa fa-bars'></i></div><div class='sub-shopping-item hidden'><form id='sub-shopping-form" + counter + "'><input type='text' name='Note' class='note' placeholder='Note'><input type='date' class='date'></input><i class='fa fa-plus'></i><i class='fa fa-repeat'></i></form><hr id='hr2'></div></div>");
      event.preventDefault();
      $("#add-item").val('');
      $("#quantity").val('');
      $("#measurement").val('');
  });

  //if click on checkbox make 1)shopping item grey out and 2)strike-out text item  and 3)move shopping item to bottom of shopping list div
  $('#shopping-list').on('click', ':checkbox', function( event ){
    $(this).closest('.shopping-item').children('p').toggleClass('strikethrough', this.checked );
    $(this).closest('.shopping-item-container').appendTo("#shopping-list")
                                               .toggleClass("disabled");
    
  });
  
  //if click on note icon then make submenu appear/disappear
  $("#shopping-list").on('click', '.fa-bars', function(){
    $(this).closest(".shopping-item").next().slideToggle().toggleClass("hidden"); 
  });

  //if click submit2 (fa-plus) button then save value of note and date to sub-shopping item
  $('#shopping-list').on('click','.fa-plus', function(){
    var note = $(this).closest(".sub-shopping-item").find(".note").val();
    var date = $(this).closest(".sub-shopping-item").find(".date").val();
    var value = note + " " + date;
    
    $(this).closest(".sub-shopping-item").toggleClass("expand")
                                         .append("<div class='sub-shopping-notefield'></div>")
                                         .children(".sub-shopping-notefield").text(value);
    $(this).replaceWith("<i class='fa fa-minus'></i>");
  });

  //if click submit2 (fa-minus) button
  $('#shopping-list').on('click','.fa-minus', function(){
    $(this).closest(".sub-shopping-item").toggleClass("expand")  
                                         .children(".sub-shopping-notefield").hide();
    $(this).replaceWith("<i class='fa fa-plus'></i>");
  });

  //if click on reset/repeat button make text and date input fields reset
  $('#shopping-list').on('click','.fa-repeat', function( event ){
    $(".note").val('');   
    $(".date").val('');
    $(".sub-shopping-notefield").text('');
  });

  //if click on bin button then remove the current shopping item
  $('#shopping-list').on('click','.fa-trash-o', function(){
    $(this).closest('.shopping-item-container').slideUp('normal');
  });


});
