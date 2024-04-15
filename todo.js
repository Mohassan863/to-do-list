const section1 = document.querySelector(".section1");
const section3 = document.querySelector(".section3");
const inputtask = document.querySelector(".inputtask");
const button1 = document.querySelector(".button1");

let mytask = document.createElement("p");
mytask.classList.add('mytask');
let tasks = [];//empty array to store tasks

if (localStorage.getItem("mytasks")) {
tasks = JSON.parse(localStorage.getItem("mytasks"));
}

//trigger get data from local storage function
getDataFromLocalStorage();


button1.addEventListener("click", function() {
    if (inputtask.value.trim() !== '') {//trim بتشيل الفواصل 
        addTaskTOArray(inputtask.value);
        
        inputtask.value = ''; // إفراغ حقل الإدخال بعد إضافة المهمة

    }
});


section1.addEventListener("click",(e)=>{
//delete button
if (e.target.classList.contains("del")){
    deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();

}

if (e.target.classList.contains("task")){
    //toggle completed for the task
    toggleStateTaskWith(e.target.getAttribute("data-id"));

    //toggle done class
    e.target.classList.toggle("done");


}
})



function addTaskTOArray(tasktext){
//Task data
const task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
    date: new Date(),
}
console.log(task);
//push task to array of tasks
tasks.push(task);
// add tasks to page
addElementToPageFrom(tasks);
//add tasks to local storage
addDataToLocalStorageFrom();
}

function addElementToPageFrom(task){
// empty the section1
section1.innerHTML = "";
// looping on tasks
tasks.forEach((task) => {
    //create main div
    let div = document.createElement("div");
    div.className = "task";
    //checkif task is done

    if(task.completed){
        div.className = "task done";

    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode( task.title));
    //create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    let nav = document.createElement("nav");
    nav.className = "taskdate";
    div.appendChild(nav);
    let dateAsString = task.date.toString();
    let dates = dateAsString.substring(0, 24);
    
   nav.appendChild(document.createTextNode(dates));
   

    //add task div to tasks container
    section1.appendChild(div);
   
});
}


function addDataToLocalStorageFrom(){
window.localStorage.setItem("mytasks",JSON.stringify(tasks));

}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("mytasks");
    if (data){//هو هنا هيحقق ده لو انا عملت اعادة تحميل للصفحة بس.

let mytasks = JSON.parse(data);
addElementToPageFrom(mytasks);
    }
}
function deleteTaskWithId(taskId){
    tasks = tasks.filter((task)=> task.id != taskId);
    addDataToLocalStorageFrom(tasks);
}
function toggleStateTaskWith(taskId){
for (let i = 0; i<tasks.length; i++){
    if(tasks[i].id == taskId) {
        tasks[i].completed == false ? (tasks[i].completed = true) : (tasks[i].completed = false);

    }
}
addDataToLocalStorageFrom(tasks);

}
