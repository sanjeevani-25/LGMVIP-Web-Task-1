const addBtn = document.getElementById("add-task");
const newTask = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks-container");
const countValue = document.querySelector("#rem-tasks");

let taskCount = 0;

const displayCount = (taskCnt) => {
  countValue.innerHTML = taskCnt;
};

const addTask = () => {
  const taskName = newTask.value.trim();
  if (!taskName) {
    alert("Cannot add empty task!");
    return;
  }
  const task_div = document.createElement("div");
  task_div.classList.add("each-task");
  taskContainer.appendChild(task_div);

  const task_completed_button = document.createElement("input");
  task_completed_button.classList.add("task-check");
  task_completed_button.setAttribute("type", "checkbox");
  task_div.appendChild(task_completed_button);

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.value = taskName;
  task_input.setAttribute("readonly", "readonly");
  task_div.appendChild(task_input);

  const task_edit_button = document.createElement("button");
  task_edit_button.classList.add("edit");
  var edit_icon = document.createElement("i");
  edit_icon.className = "fa-solid fa-pen-to-square";
  task_edit_button.appendChild(edit_icon);

  const task_delete_button = document.createElement("button");
  task_delete_button.classList.add("delete");
  var delete_icon = document.createElement("i");
  delete_icon.className = "fa-solid fa-trash";
  task_delete_button.appendChild(delete_icon);

  task_div.appendChild(task_edit_button);
  task_div.appendChild(task_delete_button);
  taskCount += 1;
  displayCount(taskCount);

  task_delete_button.onclick = () => {
    task_delete_button.parentNode.remove();
    taskCount -= 1;
    displayCount(taskCount);
  };

//   const makeEditable = () => {
//     task_input.removeAttribute("readonly");
//     task_input.focus();
//     task_edit_button.firstChild.className = "fa-solid fa-save";
//     task_edit_button.onclick = makeReadonly;

//     // task_input.onblur = makeReadonly;
//   };


//   const makeReadonly = () => {
//     task_input.setAttribute("readonly", "readonly");
//     task_edit_button.firstChild.className = "fa-solid fa-pen-to-square";
//     task_edit_button.onclick = makeEditable;
//   };

//   task_edit_button.onclick = makeEditable;

const taskInput = task_input;  // using the task_input created above
const button = task_edit_button;




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

  newTask.value = "";
};

addBtn.addEventListener("click", addTask);
