const inputText = document.querySelector(".inputText");
const TodoApp = document.querySelector(".TodoApp");

const serverUrl = "";
const TodoCreateAPI = `/api/v1/save`;
const GetTodoAPI = `/api/v1/get`;
const DeleteTodoAPI = `/api/v1/delete`;

async function addList() {
    try {
        console.log("hi");
        const inputValue = inputText.value;
        const inputObj = { toDo: inputValue };

        const response = await fetch(TodoCreateAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputObj),
        });

        const data = await response.json();
        console.log(data);
        window.location.reload();
    } catch (err) {
        console.error("Error adding task:", err);
    }
}

async function showTodo() {
    try {
        const response = await fetch(GetTodoAPI);
        const data = await response.json();
        console.log(data);
        showTodoData(data);
    } catch (err) {
        console.error("Error fetching tasks:", err);
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${DeleteTodoAPI}/${id}`, { method: "DELETE" });
        const data = await response.json();
        console.log(data);

        
        document.getElementById(id).remove();
    } catch (err) {
        console.error("Error deleting task:", err);
    }
}

function showTodoData(data) {
    data.forEach((element) => {
        const listParent = document.createElement("div");
        listParent.id = element._id; 

        const listText = document.createElement("p");
        const button = document.createElement("button");

        listText.textContent = element.toDo;
        button.textContent = "Delete";

        listParent.appendChild(listText);
        listParent.appendChild(button);
        TodoApp.appendChild(listParent);

        listParent.classList.add("listParent");
        listText.classList.add("listText");
        button.classList.add("deleteBtn");

        listParent.addEventListener("click", () => {
            listText.classList.toggle("completed");
        });

        button.addEventListener("click", (event) => {
            event.stopPropagation(); 
            deleteTodo(element._id);
        });

        console.log(listParent);
    });
}

showTodo();
