function renderTodos(list) {
  $("#to-dos").empty(); // This will empty the html

  // Creating a for loop so that we can dynamically create our todos onto the page
  for (var i = 0; i < list.length; i++) {
    
    // Create a new variable that will hold a <p> tag.
    // Set the value of the list at "i" as text to the "<p>" element.
    var p = $("<p id='p-color'>");
    p.text(list[i]);
    
    // Create a button based off of the number at i, which will cause it to be unique at every iteration.
    // Give button an attribute of "data-to-do" at i and a class called "checkbox".
    // Add a checkmark as the text of the button.
    var btnCheck = $("<button>");
    btnCheck
    .attr("data-to-do", i)
    .addClass("btn btn-checkbox checkbox")
    .text("✓");

    // Append the button to the todo item
    p = p.prepend(btnCheck);

    // Add the button and the p tag to the todos div 
    $("#to-dos").append(p);
  }
}

$("#add-to-do").on("click", function(event) {
  event.preventDefault();

  // Obtain value from textbox and store it as a variable
  var toDoTask = $("#to-do").val().trim();

  // Add new todo to localStorage
  list.push(toDoTask);

  // Update ToDo's
  renderTodos(list);

  // Save the todos into local storage.
  // We need JSON.stringify to convert them into a string inside the storage.
  localStorage.setItem("todoList", JSON.stringify(list));

  // Clear the textbox when finished.
  $("#to-do").val("");
});

// When user clicks the checkbox, that respective thing will disappear 
$(document).on("click", ".checkbox", function() {

  // Get the unique number of the specified button and hold it in a variable.
  var toDeleteNumber = $(this).attr("data-to-do");

  // Deletes specified ID number of button
  list.splice(toDeleteNumber, 1);

  // Update the todos on the page.
  renderTodos(list);

  // Save the todos into local storage
  // JSON.stringify again

  localStorage.setItem("todoList", JSON.stringify(list));
});

// Load the todos from the localStorage so if it's a returning user, it shall display
// JSON.parse is needed to re-string the array that gets received.
var list = JSON.parse(localStorage.getItem("todoList"));

// Checks to see if todolist exists in localStorage and is already an array. 
// If not, then set the array to empty.
// Otherwise, our list of arrays shows
if (!Array.isArray(list)) {
  list = [];
}

// Update the todos!!!
renderTodos(list);