// TODO

const todoList = [];
class TodoList {
  constructor(listElementParam) {
    this.todoListElement = listElementParam;
  }
  idCreater(){
    let randomId;
    do {
      randomId = Math.floor(Math.random() * 10000);
    } while (todoList.includes(randomId));
    return randomId;
  }
  add(todoText) {
    const todoObject = {
      
      // id: todoList.length * 5,
      // id: todoList.length,
      id: this.idCreater(),
      todoText: todoText,
      isDone: false,
      index: todoList.length,
    };
    todoList.push(todoObject);
    this.display();
  }

  deleteObject(todoId){
    //delete todoList[todoId];
    const selectedTodoIndex= todoList.findIndex(item=>item.id==todoId)
    todoList.splice(selectedTodoIndex,1);
    this.display();
  }
  done(todoId) {
      const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);
      todoList[selectedTodoIndex].isDone = !todoList[selectedTodoIndex].isDone;
      this.display();
  }

  display() {
    this.todoListElement.innerHTML = "";

    todoList.forEach((item) => {
      
      const listElement = document.createElement("li");

      listElement.innerText = item.todoText;
      listElement.setAttribute("data-id", item.id);
      // listElement.style.display="inline";

      const divElement = document.createElement("div");

      const listImgElement = document.createElement("img");
      listImgElement.setAttribute("src","./image/dustbin.png");
      listImgElement.classList.add("dustbin");
      listImgElement.setAttribute("data-id",item.id);

      listImgElement.addEventListener("click",e=>{
        const selectedId = e.target.getAttribute("data-id");
        this.deleteObject(selectedId);
      })
      
      if (item.isDone) {
        listElement.classList.add("checked");
      }
        listElement.addEventListener("click", function (e) {
          const selectedId = e.target.getAttribute("data-id");
          myTodoList.done(selectedId);
        });
        divElement.appendChild(listElement);
        divElement.appendChild(listImgElement);
        this.todoListElement.appendChild(divElement);
    });
  }
}

const listSection = document.querySelector("#myUL");
const secondList = document.querySelector("#severekAyrilanlar");

const myTodoList = new TodoList(listSection);
const inputElement=document.querySelector("#myInput");

inputElement.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector("#todo_button").click();
  }
});

document.querySelector("#todo_button").addEventListener("click", function () {
  const todoText = inputElement.value;
  if(todoText=="") alert("Please write something to do");
  else myTodoList.add(todoText);
  inputElement.value="";
  inputElement.focus();
});
