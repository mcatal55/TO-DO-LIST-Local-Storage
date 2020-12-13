var idNummer = 0;
var aTaskList;

localstorageControl();

function localstorageControl() {
    if (localStorage.getItem("aTaskList")) {
        aTaskList = []
        aTaskList = JSON.parse(localStorage.getItem("aTaskList"));

        aTaskList.forEach(element => {
            loadItem(element, "ulActive")
        });
    } else {
        aTaskList = [];
        localStorage.setItem("aTaskList", JSON.stringify(aTaskList))
    }

    if (localStorage.getItem("bTaskList")) {
        bTaskList = []
        bTaskList = JSON.parse(localStorage.getItem("bTaskList"));

        bTaskList.forEach(element => {
            loadItem(element, "ulPassive")

        });
    } else {
        bTaskList = [];
        localStorage.setItem("bTaskList", JSON.stringify(bTaskList))
    }
}






function addItem(text) {
    //get input value
    var textTask = document.getElementById('textInput')


    if (textTask.value.trim() != "") {
        idNummer++;

        createItem(textTask.value, "ulActive");

        addLocalstorage(textTask.value, "aTaskList");

        textTask.value = "";
    }
}

function createItem(inputText, localstorageName) {
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
    liButton.setAttribute('onclick', `deleteItem(${idNummer})`)

    li.appendChild(liButton);
    console.log(localstorageName)
    //insert li element with button inside ul element
    document.getElementById(localstorageName).appendChild(li);
    if (localstorageName == "ulPassive") {
        li.style.backgroundColor = "#ff9c9c";
        liInput.checked = true;
    }
}

function loadItem(inputText, localstorageName) {
    idNummer++;
    createItem(inputText, localstorageName);
}

function deleteItem(itemId) {
    var item = document.getElementById("li" + itemId);
    item.remove();

    taskListA = JSON.parse(localStorage.getItem("aTaskList"));
    aTaskList = []
    taskListA.forEach(element => {
        aTaskList.push(element);
    });

    aTaskList.splice(aTaskList.indexOf(item.innerText), 1)
    localStorage.setItem("aTaskList", JSON.stringify(aTaskList))
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
    aTaskList = []
    taskListA.forEach(element => {
        aTaskList.push(element);
    });

    aTaskList.splice(aTaskList.indexOf(inputText), 1)
    localStorage.setItem(localstorageName, JSON.stringify(aTaskList))
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

    if (item.checked) {
        listItem.style.backgroundColor = "#ff9c9c";

        document.getElementById("ulPassive").appendChild(listItem);

        addLocalstorage(listItem.innerText, "bTaskList")
        deleteLocalstorage(listItem.innerText, "aTaskList")

    } else {
        listItem.style.backgroundColor = "#fff";
        document.getElementById("ulActive").appendChild(listItem);

        addLocalstorage(listItem.innerText, "aTaskList")
        deleteLocalstorage(listItem.innerText, "bTaskList")
    }
}