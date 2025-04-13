const inputText = document.querySelector(".inputText");
const TodoApp = document.querySelector(".TodoApp");

const serverUrl = "https://full-stack-todo-app-smoky.vercel.app/";
const TodoCreateAPI = `${serverUrl}/api/v1/save`;
const GetTodoAPI = `${serverUrl}/api/v1/get`;
const DeleteTodoAPI = `${serverUrl}/api/v1/delete`;

async function addList() {
    try {
      console.log("hi")
      let inputValue = inputText.value;
      let inputObj = { toDo: inputValue };
  
      const response = await fetch(TodoCreateAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputObj),
      });
  
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  
  async function showTodo() {
    try {
      const response = await fetch(GetTodoAPI);
      const data = await response.json();
      console.log(data);
      showTodoData(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  showTodo();
  
  
  // -----------------------------------------------------------------------------by gpt new -----------------------------------------------------------
  async function deleteTodo(id) {
    try {
      const response = await fetch(`${DeleteTodoAPI}/${id}`, { method: 'DELETE' });
      const data = await response.json();
      console.log(data);
  
      // Remove the deleted task from the DOM
      document.getElementById(id).remove();
    } catch (err) {
      console.log(err);
    }
  }
  
  
  function showTodoData(data) {
    data.forEach((element) => {
      const listParent = document.createElement("div");
      listParent.id = element._id;  // Set the id for the element
  
      const listText = document.createElement("p");
      const button = document.createElement("button");
  
      listText.textContent = element.toDo;
      button.textContent = "Delete";
  
      listParent.appendChild(listText);
      listParent.appendChild(button);
      TodoApp.appendChild(listParent);
  
      listParent.classList.add('listParent');
      listText.classList.add('listText');
      button.classList.add('deleteBtn');
  
      listParent.addEventListener('click', () => {
        listText.classList.toggle('completed');
      });
  
      button.addEventListener('click', (event) => {
        event.stopPropagation();  // Prevents the click event from bubbling up
        deleteTodo(element._id);
      });
  
      console.log(listParent);
    });
  }
  