
//toggle() method signature was deprecated in jQuery 1.8 and removed in jQuery 1.9. As no alternatives are being offered, I found the suggested code below as an alternative solution. source: https://forum.jquery.com/topic/beginner-function-toggle-deprecated-what-to-use-instead.

// place this before all code, outside of document ready.
$.fn.clicktoggle = function(a, b) {
  return this.each(function() {
      var clicked = false;
      $(this).bind("click", function() {
          if (clicked) {
              clicked = false;
              return b.apply(this, arguments);
          }
          clicked = true;
          return a.apply(this, arguments);
      });
  });
};

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
    //Is there a way to actually disable the item except for the checkbox??
    // Answer: it looks like you already have this working, by using .closest('.shopping-item-container')
  });
  
  //if click on note logo then make submenu appear/disappear
  $("#shopping-list").on('click', '.fa-bars', function(){
    $(this).closest(".shopping-item").next().toggleClass("hidden"); 
  });

  //if click submit2 (fa-plus) button then save value of note and date to sub-shopping item
  // $('#shopping-list').on('click','.fa-plus', function(){
  //   var note = $(this).closest(".sub-shopping-item").find(".note").val();
  //   var date = $(this).closest(".sub-shopping-item").find(".date").val();
  //   var value = note + " " + date;
  //   $(this).closest(".sub-shopping-item").toggleClass("expand")
  //                                        .append("<div class='sub-shopping-notefield'></div>")
  //                                        .children(".sub-shopping-notefield").text(value);
    
  // });

  //if click on submit2 (fa-plus) button toggle between two different functions using newly added clicktoggle function (at top of page). QUESTION: Why is there a non-response only after the FIRST press of the button?
  $('#shopping-list').on('click','.fa-plus', function(){
    var note = $(this).closest(".sub-shopping-item").find(".note").val();
    var date = $(this).closest(".sub-shopping-item").find(".date").val();
    var value = note + " " + date;

    //append div sub-shopping-notefield to sub-shopping-item
    $(this).closest(".sub-shopping-item").append("<div class='sub-shopping-notefield'></div>");
    $(this).closest(".sub-shopping-item").clicktoggle(
      function() {
        // 1)expand sub-shopping item
        $(this).addClass("expand")
        // 2)add input value to notefield
        .children(".sub-shopping-notefield").text(value)
        // 3)show div sub-shopping-notefield
        .show();
        // 4)change plus icon to minus icon
        $(".fa-plus").replaceWith("<i class='fa fa-minus'></i>");

      }, function() {
        // 1)contract sub-shopping item
        $(this).removeClass("expand")
        // 2)hide div sub-shopping-notefield
        $(this).children(".sub-shopping-notefield").hide();
        // 3)change minus icon to plus icon
        $(".fa-minus").replaceWith("<i class='fa fa-plus'></i>");
      }
    )
  });

  //if click on reset/repeat button make text and date input fields reset   QUESTION: Why does this button inherit the functionality of the submit2 button?
  $('#shopping-list').on('click','.fa-repeat', function(){
    $(".note").val('');   
    $(".date").val('');
    $(".sub-shopping-notefield").text('');
    //QUESTION: How do I reset the value variable when I hit the reset button? How do I enter the scope of the previous function?
  });

  //if click on bin button then remove the current shopping item
  $('#shopping-list').on('click','.fa-trash-o', function(){
    $(this).closest('.shopping-item-container').slideUp('normal');
  });


});
