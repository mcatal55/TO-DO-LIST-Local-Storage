var idNummer = 0;
var activeTaskList;

localstorageControl();

function localstorageControl() {

    if (localStorage.getItem("activeTaskList")) {
        activeTaskList = []
        activeTaskList = JSON.parse(localStorage.getItem("activeTaskList"));

        activeTaskList.forEach(element => {
            loadItem(element, "activeList", "activeTaskList")
        });
    } else {
        activeTaskList = [];
        localStorage.setItem("activeTaskList", JSON.stringify(activeTaskList))
    }

    if (localStorage.getItem("passiveTaskList")) {
        passiveTaskList = []
        passiveTaskList = JSON.parse(localStorage.getItem("passiveTaskList"));

        passiveTaskList.forEach(element => {
            loadItem(element, "passiveList", "passiveTaskList")
        });
    } else {
        passiveTaskList = [];
        localStorage.setItem("passiveTaskList", JSON.stringify(passiveTaskList))
    }
}


function addItem(text) {
    //get input value
    var textTask = document.getElementById('textInput')

    if (textTask.value.trim() != "") {
        idNummer++;

        createItem(textTask.value, "activeList", "activeTaskList");

        addLocalstorage(textTask.value, "activeTaskList");

        textTask.value = "";
    }
}

function createItem(inputText, listName, taskType) {
    //create li element and add its attributes
    var li = document.createElement("li");

    li.setAttribute('class', 'list-group-item list-group-item-ligh justify-content-between text-dark d-flex  align-items-center mt-1')
    li.setAttribute('id', 'li' + idNummer)

    //creat input and insert inside li element
    var liInput = document.createElement("input");
    liInput.setAttribute('class', 'form-check-input me-1')
    liInput.setAttribute('id', 'input' + idNummer)
    liInput.setAttribute('type', 'checkbox')
    liInput.setAttribute('onclick', `clickCheckbox(${idNummer})`)
    li.appendChild(liInput);

    var iText = document.createTextNode(inputText);
    li.appendChild(iText)

    //create button element and insert inside li element
    var liButton = document.createElement("button");
    liButton.setAttribute('type', 'button')
    liButton.setAttribute('class', 'btn-close')
    liButton.setAttribute('aria-label', 'Close')
    liButton.setAttribute('onclick', `deleteItem(${idNummer}, "${taskType}")`)

    li.appendChild(liButton);

    //insert li element with button inside ul element
    document.getElementById(listName).appendChild(li);

    if (listName == "passiveList") {
        li.style.backgroundColor = "#ff9c9c";
        liInput.checked = true;
    }
}

function loadItem(inputText, listName, taskType) {
    idNummer++;
    createItem(inputText, listName, taskType);
}

function deleteItem(itemId, taskType) {
    var item = document.getElementById("li" + itemId);
    item.remove();

    taskListA = JSON.parse(localStorage.getItem(taskType));
    taskList = []
    taskListA.forEach(element => {
        taskList.push(element);
    });

    taskList.splice(taskList.indexOf(item.innerText), 1)
    localStorage.setItem(taskType, JSON.stringify(taskList))
}

function addLocalstorage(inputText, localstorageName) {
    taskListA = JSON.parse(localStorage.getItem(localstorageName));
    TaskList = []
    taskListA.forEach(element => {
        TaskList.push(element);
    });
    TaskList.push(inputText);
    localStorage.setItem(localstorageName, JSON.stringify(TaskList))

}

function deleteLocalstorage(inputText, localstorageName) {
    taskListA = JSON.parse(localStorage.getItem(localstorageName));
    activeTaskList = []
    taskListA.forEach(element => {
        activeTaskList.push(element);
    });

    activeTaskList.splice(activeTaskList.indexOf(inputText), 1)
    localStorage.setItem(localstorageName, JSON.stringify(activeTaskList))
}

//Add Item with Enter
var enterKey = document.getElementById("textInput");
enterKey.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        addItem()
    }
});

function clickCheckbox(idnummer) {
    var item = document.getElementById("input" + idnummer);
    var listItem = document.getElementById("li" + idnummer);
    console.log(idnummer)
    if (item.checked) {
        listItem.style.backgroundColor = "#ff9c9c";

        document.getElementById("passiveList").appendChild(listItem);
        console.log(listItem)

        addLocalstorage(listItem.innerText, "passiveTaskList")
        deleteLocalstorage(listItem.innerText, "activeTaskList")

        //set liButton onclick 
        var liButton = document.getElementById("input"+ idnummer).nextElementSibling;
        liButton.setAttribute('onclick', `deleteItem(${idnummer}, "passiveTaskList")`)

    } else {
        listItem.style.backgroundColor = "#fff";
        document.getElementById("activeList").appendChild(listItem);

        addLocalstorage(listItem.innerText, "activeTaskList")
        deleteLocalstorage(listItem.innerText, "passiveTaskList")

        //set liButton onclick Inhalt
        var liButton = document.getElementById("input"+ idnummer).nextElementSibling;
        liButton.setAttribute('onclick', `deleteItem(${idnummer}, "activeTaskList")`)
    }
}