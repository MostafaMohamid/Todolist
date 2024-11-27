var taskInputBtn = document.getElementById("taskInput");
var todoAddButton = document.getElementById("todo-button");
var todosContainer = document.getElementById("todos-container");
var mySelect = document.getElementById("mySelect");
var searchInput = document.getElementById("searchInput");

var allTodos = [];
if (localStorage.getItem("allTodos") != null) {

    allTodos = JSON.parse(localStorage.getItem("allTodos"))
    displayNotes(allTodos)
}




todoAddButton.addEventListener("click", function () {

    var task = {

        taskDetails: taskInputBtn.value,
        isCompleted: false,
        id: `${Math.floor(Math.random() * 1000)}_${Math.floor(Math.random() * 1000)}`
    }
    allTodos.push(task)
    localStorage.setItem("allTodos", JSON.stringify(allTodos))
    displayNotes(allTodos)
})
////allTodos
function displayNotes(arr) {

    var cartona = ``
    for (var task of arr) {
        cartona += `<div class="col-11 todo  ${task.isCompleted == true ? " completed " : ""}  ">
              <div class="row bg-dark">
                <div class="col-8  py-3 fs-5">${task.taskDetails}</div>                            
                <div class="col-2  py-3 bg-success d-flex justify-content-center" onclick="becompleted('${task.id}')"><i class="fa-solid fa-check fs-3  d-flex align-items-center"></i></div>
                <div class="col-2  py-3 bg-danger d-flex justify-content-center" onclick="deletedItem('${task.id}')"><i class="fa-solid fa-trash fs-3  d-flex align-items-center"></i></div>
              </div>
            </div>`

        todosContainer.innerHTML = cartona;


    }



}

///completed
function becompleted(indexId) {
    var foundedElment = allTodos.findIndex(function (task) { return task.id == indexId });
    allTodos[foundedElment].isCompleted = allTodos[foundedElment].isCompleted == false ? true : false;


    console.log(allTodos); (
        localStorage.setItem("allTodos", JSON.stringify(allTodos)))
    displayFilterdData()
}


///delete
function deletedItem(id) {
    var deletedIndex = allTodos.findIndex(function (note) { return note.id == id })
    allTodos.splice(deletedIndex, 1)
    displayNotes(allTodos)

    localStorage.setItem("allTodos", JSON.stringify(allTodos))

}
////////////////////////////////////
//select


mySelect.addEventListener("change", function () {

    displayFilterdData()



})

function displayFilterdData() {

    console.log(mySelect.options[mySelect.options.selectedIndex].value);


    switch (mySelect.options[mySelect.options.selectedIndex].value) {


        case 'all':
            displayNotes(allTodos)
            break;

        case 'completed':
            var completedList = allTodos.filter(function (task) { return task.isCompleted == true })

            console.log(completedList);
            displayNotes(completedList)
            break;
        case 'uncompleted':
            var uncompletedList = allTodos.filter(function (task) { return task.isCompleted == false })
            displayNotes(uncompletedList)
            break;
    }
}

searchInput.addEventListener("input", function (e) {
    console.log(e.target.value.tolowerCase());
    var foundedSearch = [];
    for (var i = 0; i < allTodos.length; i++) {
        if (allTodos[i].taskDetails?.toLowerCase().includes(e.target.value?.toLowerCase())) {

            foundedSearch.push(allTodos[i])

        }
        displayNotes(foundedSearch)
    }

})



