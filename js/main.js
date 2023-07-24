import TaskList from "./taskList.js";
import TaskItem from "./taskItem.js";

const taskList = new TaskList();

document.addEventListener("readystatechange", (event) =>{
    if(event.target.readyState === "complete"){
        startApp();
    }
});

const startApp = () => {
    const entryForm = document.getElementById("itemEntryForm");
    makeSubmissionListener(entryForm);
    const taskDeletion = document.getElementById("clearItemsButton");
    makeDeletionListener(taskDeletion)
    loadListObject();
    refreshPage();
};

const makeSubmissionListener = (entryForm) =>{
    entryForm.addEventListener("submit", (event) =>{
        event.preventDefault();
        itemSubmissinProcess();
    });
};

const makeDeletionListener = (taskDeletion) =>{
    taskDeletion.addEventListener("click", (event) =>{
        const list = taskList.getList();
        if (list.length){
            const confirmed = confirm("Do you want to clear the list?");
            if (confirmed)
                deleteItems();
        }
    });
}

const deleteItems = () =>{
    taskList.clearList();
    updateTheData(taskList.getList());
    refreshPage();
}

const loadListObject = () =>{
    const storedList = localStorage.getItem("myTaskList");
    if (typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList.forEach(itemObj =>{
        const newTaskItem = createNewTask(itemObj._id, itemObj._item);
        taskList.addItemToList(newTaskItem);
    });
};

const refreshPage = () =>{
    clearListDisplay();
    configureList();
    clearTaskEntryField();
    setFocusOnTaskEntry();
};

const clearListDisplay = () =>{
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
};

const deleteContents = (parentElement) =>{
    let child = parentElement.lastElementChild;
    while(child){
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const configureList = () =>{
    const list = taskList.getList();
    list.forEach(item => {
        buildListEntry(item);
    });
};

const buildListEntry = (item) =>{
    const checkBox = document.createElement("input");  //creating the checkbox for the new Item
    checkBox.type = "checkbox";
    checkBox.id = item.getId();
    checkBox.tabIndex = 0;
    makeClickListenerForCheckBox(checkBox);
    const entryLabel = document.createElement("label");  //creating the label for the new item
    entryLabel.htmlFor = item.getId();
    entryLabel.textContent = item.getItem();
    const entryBox  = document.createElement("div"); //creating the new item's container
    entryBox.className = "item";
    entryBox.appendChild(checkBox); //appending checkbox to container
    entryBox.appendChild(entryLabel); //appending label to the container
    const taskContainer = document.getElementById("listItems"); 
    taskContainer.appendChild(entryBox); //appending the item's box to the listItems box
};

const makeClickListenerForCheckBox = (checkbox) =>{
    
    checkbox.addEventListener("click", (event) =>{
        
        taskList.removeItemFromList(checkbox.id);
        updateTheData(taskList.getList());

        setTimeout(() => {
            refreshPage();
        }, 1000);
    });
}

const updateTheData = (listArray) =>{
    localStorage.setItem("myTaskList", JSON.stringify(listArray));
}

const clearTaskEntryField = () =>{
    document.getElementById("newEntryInput").value = "";
};

const setFocusOnTaskEntry = () =>{
    document.getElementById("newEntryInput").focus();
}

const itemSubmissinProcess = () =>{
    const newEntryText = getNewEntry();
    if (!newEntryText.length)   return;
    const nextItemId = calcIdForNextTask();
    const taskItem = createNewTask(nextItemId, newEntryText);
    taskList.addItemToList(taskItem);
    updateTheData(taskList.getList());
    refreshPage();
}

const getNewEntry = () =>{
    return document.getElementById("newEntryInput").value.trim();
}

const calcIdForNextTask = () =>{
    let nextItemId = 1;
    const list = taskList.getList();
    if (list.length > 0){
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
}

const createNewTask = (itemId, itemText) =>{
    const newTask = new TaskItem();
    newTask.setId(itemId);
    newTask.setItem(itemText);
    return newTask;
}