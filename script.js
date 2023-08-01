// Get the button, input, container, and count elements from the DOM
const addBtn = document.getElementById("add-task");
const newTask = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks-container");
const countValue = document.querySelector("#rem-tasks");

// Initialize the task count to 0
let taskCount = 0;

// Function to update the displayed count
const displayCount = (taskCnt) => {
  countValue.innerHTML = taskCnt;
};

// Function to add a new task
const addTask = () => {
  // Get the task name and trim it to remove leading/trailing spaces
  const taskName = newTask.value.trim();

  // Check if taskName is empty, if so, show an alert and return
  if (!taskName) {
    alert("Cannot add empty task!");
    return;
  }

  // Create a div for the task
  const task_div = document.createElement("div");
  task_div.classList.add("each-task");

  // Add the new task div to the task container
  taskContainer.appendChild(task_div);

  // Create a checkbox to mark the task as completed
  const task_completed_button = document.createElement("input");
  task_completed_button.classList.add("task-check");
  task_completed_button.setAttribute("type", "checkbox");

  // Add the checkbox to the task div
  task_div.appendChild(task_completed_button);

  // Create an input field for the task name
  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.value = taskName;

  // Set the input field as readonly
  task_input.setAttribute("readonly", "readonly");

  // Add the input field to the task div
  task_div.appendChild(task_input);

  // Create an edit button for the task
  const task_edit_button = document.createElement("button");
  task_edit_button.classList.add("edit");
  var edit_icon = document.createElement("i");
  edit_icon.className = "fa-solid fa-pen-to-square";

  // Add the edit icon to the edit button
  task_edit_button.appendChild(edit_icon);

  // Create a delete button for the task
  const task_delete_button = document.createElement("button");
  task_delete_button.classList.add("delete");
  var delete_icon = document.createElement("i");
  delete_icon.className = "fa-solid fa-trash";

  // Add the delete icon to the delete button
  task_delete_button.appendChild(delete_icon);

  // Add the edit and delete buttons to the task div
  task_div.appendChild(task_edit_button);
  task_div.appendChild(task_delete_button);

  // Increase the task count and update the displayed count
  taskCount += 1;
  displayCount(taskCount);

  // Set the click handler for the delete button to remove the task and update the count
  task_delete_button.onclick = () => {
    task_delete_button.parentNode.remove();
    taskCount -= 1;
    displayCount(taskCount);
  };

  let saveTimeout = null;
  const saveDelay = 2000;

  // Function to make the task editable
  const makeEditable = () => {
    // Make the input field editable and focus it
    task_input.removeAttribute("readonly");
    task_input.focus();

    // Change the button to a 'save' button
    task_edit_button.firstChild.className = "fa-solid fa-save";

    // Set a handler to save the task after a delay whenever the input field is edited
    task_input.oninput = () => {
      // clear the previous timeout
      if (saveTimeout !== null) {
        clearTimeout(saveTimeout);
      }
      // set a new timeout
      saveTimeout = setTimeout(makeReadonly, saveDelay);
    };

    // Set a handler to save the task immediately when the button is clicked
    task_edit_button.onclick = () => {
      // clear the timeout and save immediately when the button is clicked
      if (saveTimeout !== null) {
        clearTimeout(saveTimeout);
        saveTimeout = null;
      }
      makeReadonly();
    };
  };

  // Function to make the task readonly
  const makeReadonly = () => {
    if (saveTimeout !== null) {
      clearTimeout(saveTimeout);
      saveTimeout = null;
    }

    // Make the input field readonly
    task_input.setAttribute("readonly", "readonly");

    // Change the button back to an 'edit' button
    task_edit_button.firstChild.className = "fa-solid fa-pen-to-square";

    // Set a handler to make the task editable when the button is clicked
    task_edit_button.onclick = makeEditable;
  };

  // Initially, the button is an 'edit' button
  task_edit_button.onclick = makeEditable;

  // Add a handler to strike through the task name when the checkbox is checked, and update the count
  task_completed_button.addEventListener("change", () => {
    const taskText = task_completed_button.nextElementSibling;
    if (task_completed_button.checked) {
      taskText.style.textDecoration = "line-through";
      taskCount -= 1;
    } else {
      taskText.style.textDecoration = "none";
      taskCount += 1;
    }
    displayCount(taskCount);
  });

  // Clear the task input field
  newTask.value = "";
};

// Add a handler to add a new task when the button is clicked
addBtn.addEventListener("click", addTask);
