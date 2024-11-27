var taskInputBtn  = document.getElementById("taskInput");
var todoAddButton = document.getElementById("todo-button");
var todosContainer = document.getElementById("todos-container");
var mySelect  = document.getElementById("mySelect");
var searchInput=document.getElementById("searchInput");
 var allTodos = []
 if(localStorage.getItem('allTodos') !=null){
    allTodos = JSON.parse(localStorage.getItem("allTodos"));
    displayData(allTodos)
 }
todoAddButton.addEventListener('click',function(){
    var task = {
        taskDetails:taskInputBtn.value,
        isCompleted:true,
        id:`${Math.random()*10000}-${Math.random()*10000}`
    }
    allTodos.push(task);
    localStorage.setItem('allTodos',JSON.stringify(allTodos))
    displayData(allTodos);
    clear()
})



function displayData(arr){
    var cartoona = ""
for (var task of arr) {
    cartoona+=`
    <div class="col-11 todo ${task.isCompleted == true ? "completed":""}">
    <div class="row bg-dark">
      <div class="col-8  py-3 fs-5">${task.taskDetails}</div>
      <div class="col-2  py-3 bg-success d-flex justify-content-center" onclick="beCompleted('${task.id}')"><i class="fa-solid fa-check fs-3  d-flex align-items-center"></i></div>
      <div class="col-2  py-3 bg-danger d-flex justify-content-center" onclick="deltedTodo('${task.id}')"><i class="fa-solid fa-trash fs-3  d-flex align-items-center"></i></div>
    </div>
  </div>
    `
}
todosContainer.innerHTML = cartoona
}
function beCompleted(id){
 var foundedIndex = allTodos.findIndex(function(task){return task.id == id });
 allTodos[foundedIndex].isCompleted = allTodos[foundedIndex].isCompleted == true ? false : true
 localStorage.setItem('allTodos',JSON.stringify(allTodos));
 DisplayAccordingToSelectValue();

}

mySelect.addEventListener('change',function(){
    DisplayAccordingToSelectValue()
})


function DisplayAccordingToSelectValue (){
    switch(mySelect.options[mySelect.options.selectedIndex].value){
        case 'all':
            displayData(allTodos);
            break;
        case 'completed':
           var compltedFilterd =  allTodos.filter(function(hamada){ return hamada.isCompleted == true});
           displayData(compltedFilterd);
           break;
        case 'uncompleted' : 
        var unCompletedFilter =allTodos.filter(function(hambozo){ return hambozo.isCompleted==false});
        displayData(unCompletedFilter)
    }
}





function deltedTodo(id){
    console.log(id);
    var index = allTodos.findIndex(function(task){return task.id == id});
    allTodos.splice(index,1)
    displayData(allTodos);
    localStorage.setItem("allTodos",JSON.stringify(allTodos));    
}








searchInput.addEventListener('input',function(e){
    console.log(e.target.value);
    var searchResult=[] 
    for(var i = 0 ; i<allTodos.length ;i++){
        
        if(allTodos[i].taskDetails.toLowerCase().includes(e.target.value.toLowerCase())){
            searchResult.push(allTodos[i])
        }
    }
    displayData(searchResult)
})


function clear(){
    taskInputBtn.value= ""
}