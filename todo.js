const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const  TODOS_LS  = 'toDos';

function filterFn(toDo){
    return toDo.id === 1

}
let toDos=[];

function deleteToDo(){
const btn = event.target;
const li = btn.parentNode;
toDoList.removeChild(li);
const cleanToDos = toDos.filter(function filterFn(toDo){
    return toDo.id !== parseInt(li.id);
});
toDos = cleanToDos
saveToDos();
}

function saveToDos(){
     localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
   const li = document.createElement("li");
   const delBtn = document.createElement("button");
   const span = document.createElement("span");
   const newId = toDos.length+1;
   delBtn.innerText = "X";
   delBtn.addEventListener("click",deleteToDo);
   span.innerText = text;
   li.appendChild(span);
   li.appendChild(delBtn);
   li.id = newId;
   toDoList.appendChild(li);
   const toDoObj = {
       text: text,
       id: toDos.length+1
   };
   toDos.push(toDoObj);
   saveToDos();
}

function handlesubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";


}
function something(toDo){
    paintToDo(toDo.text);
}

function loadToDos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS)
    if (loadedtoDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos);
        parsedToDos.forEach(something);

    }
  
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handlesubmit);
}

init();
