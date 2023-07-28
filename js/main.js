// Importing required modules
import TaskList from "./taskList.js";
import TaskItem from "./taskItem.js";

// Creating a new instance of TaskList
const taskList = new TaskList();

// Event listener for when the document has completed loading
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    startApp(); // Call the startApp function when the page is loaded
  }
});

// Function to start the application
const startApp = () => {
  const entryForm = document.getElementById("itemEntryForm"); // Get the form element for task entry
  makeSubmissionListener(entryForm); // Add a submission listener to the form
  const taskDeletion = document.getElementById("clearItemsButton"); // Get the button to clear all tasks
  makeDeletionListener(taskDeletion); // Add a click listener to the deletion button
  loadListObject(); // Load the list of tasks from localStorage
  refreshPage(); // Refresh the display
};

// Function to add a submission listener to the entry form
const makeSubmissionListener = (entryForm) => {
  entryForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    itemSubmissionProcess(); // Process the new task item submission
  });
};

// Function to add a click listener to the task deletion button
const makeDeletionListener = (taskDeletion) => {
  taskDeletion.addEventListener("click", (event) => {
    const list = taskList.getList(); // Get the current list of tasks
    if (list.length) {
      const confirmed = confirm("Do you want to clear the list?"); // Confirm with the user before deleting
      if (confirmed) deleteItems(); // If confirmed, delete all tasks
    }
  });
};

// Function to delete all items in the task list
const deleteItems = () => {
  taskList.clearList(); // Clear the task list
  updateTheData(taskList.getList()); // Update the data in localStorage
  refreshPage(); // Refresh the display
};

// Function to load the task list from localStorage
const loadListObject = () => {
  const storedList = localStorage.getItem("myTaskList");
  if (typeof storedList !== "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList.forEach((itemObj) => {
    const newTaskItem = createNewTask(itemObj._id, itemObj._item); // Create a new TaskItem object
    taskList.addItemToList(newTaskItem); // Add the new task item to the task list
  });
};

// Function to refresh the page display
const refreshPage = () => {
  clearListDisplay(); // Clear the list display
  configureList(); // Configure the list display with the current task list
  clearTaskEntryField(); // Clear the task entry field
  setFocusOnTaskEntry(); // Set focus on the task entry field
};

// Function to clear the list display
const clearListDisplay = () => {
  const parentElement = document.getElementById("listItems");
  deleteContents(parentElement); // Delete all the child elements of the parent element
};

// Function to delete all child elements of a parent element
const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

// Function to configure the list display with the current task list
const configureList = () => {
  const list = taskList.getList(); // Get the current task list
  list.forEach((item) => {
    buildListEntry(item); // Build list entries for each task item
  });
};

// Function to build a list entry for a task item
const buildListEntry = (item) => {
  const checkBox = document.createElement("input"); // Create the checkbox for the new item
  checkBox.type = "checkbox";
  checkBox.id = item.getId();
  checkBox.tabIndex = 0;
  makeClickListenerForCheckBox(checkBox); // Add a click listener to the checkbox
  const entryLabel = document.createElement("label"); // Create the label for the new item
  entryLabel.htmlFor = item.getId();
  entryLabel.textContent = item.getItem();
  const entryBox = document.createElement("div"); // Create the new item's container
  entryBox.className = "item";
  entryBox.appendChild(checkBox); // Append checkbox to the container
  entryBox.appendChild(entryLabel); // Append label to the container
  const taskContainer = document.getElementById("listItems");
  taskContainer.appendChild(entryBox); // Append the item's box to the listItems box
};

// Function to add a click listener to the checkboxes
const makeClickListenerForCheckBox = (checkbox) => {
  checkbox.addEventListener("click", (event) => {
    taskList.removeItemFromList(checkbox.id); // Remove the task item from the task list
    updateTheData(taskList.getList()); // Update the data in localStorage
    setTimeout(() => {
      refreshPage(); // Refresh the display after a short delay
    }, 1000);
  });
};

// Function to update the data in localStorage
const updateTheData = (listArray) => {
  localStorage.setItem("myTaskList", JSON.stringify(listArray));
};

// Function to clear the task entry field
const clearTaskEntryField = () => {
  document.getElementById("newEntryInput").value = "";
};

// Function to set focus on the task entry field
const setFocusOnTaskEntry = () => {
  document.getElementById("newEntryInput").focus();
};

// Function to process a new task item submission
const itemSubmissionProcess = () => {
  const newEntryText = getNewEntry(); // Get the new task item text
  if (!newEntryText.length) return; // If no text, return
  const nextItemId = calcIdForNextTask(); // Calculate the next task item ID
  const taskItem = createNewTask(nextItemId, newEntryText); // Create a new TaskItem object
  taskList.addItemToList(taskItem); // Add the new task item to the task list
  updateTheData(taskList.getList()); // Update the data in localStorage
  refreshPage(); // Refresh the display
};

// Function to get the new task item text from the input field
const getNewEntry = () => {
  return document.getElementById("newEntryInput").value.trim();
};

// Function to calculate the ID for the next task item
const calcIdForNextTask = () => {
  let nextItemId = 1;
  const list = taskList.getList();
  if (list.length > 0) {
    nextItemId = list[list.length - 1].getId() + 1; // Get the last item's ID and increment by 1
  }
  return nextItemId;
};

// Function to create a new TaskItem object
const createNewTask = (itemId, itemText) => {
  const newTask = new TaskItem();
  newTask.setId(itemId); // Set the ID of the new task item
  newTask.setItem(itemText); // Set the text of the new task item
  return newTask;
};
