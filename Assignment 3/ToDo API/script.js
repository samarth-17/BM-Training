document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-addon1");
    const ulTodo = document.getElementById("ul-todo");
    const delAllBtn = document.getElementById("delete-all");
    const fetchAll=document.getElementById("fetch-all")
  
    let editMode = false;
    let editElement = null;
  
    buttonTodo.addEventListener("click", () => {
      const text = inputTodo.value;
      if (editMode) {
        editElement.querySelector(".text-todo").textContent = text;
        editMode = false;
        editElement = null;
        buttonTodo.textContent = "Add";
      } else {
        createTodo(text);
      }
      inputTodo.value = "";
      saveAllTodo();
    });

    fetchAll.addEventListener("click" , async()=>{
      axios.get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
          ulTodo.innerHTML = "";
          response.data.forEach((todo) => {
              createTodo(todo.title);
          });
      })
      .catch((error) => {
          console.error("Error fetching todos from API:", error);
      });
    })
  
    const createTodo = (task) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-start";
      li.innerHTML = `<span class="text-todo">${task}</span>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger">Edit</button>
        <button type="button" class="btn btn-warning">Delete</button>
      </div>`;
      ulTodo.appendChild(li);
    };
  
    ulTodo.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-warning")) {
        const d = e.target.closest(".list-group-item");
        const confirmation = confirm("Are you sure you want to delete?");
        if (confirmation) {
          d.remove();
          saveAllTodo();
        }
      }
  
      if (e.target.classList.contains("btn-danger")) {
        const li = e.target.closest(".list-group-item");
        const textSpan = li.querySelector(".text-todo");
  
        if (textSpan.contentEditable === "true") {
          textSpan.contentEditable = "false";
          e.target.textContent = "Edit"; 
          saveAllTodo();
        } else {
          textSpan.contentEditable = "true";
          textSpan.focus();
          e.target.textContent = "Save"; 
        }
      }
    });

  
    delAllBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all tasks?")) {
        ulTodo.innerHTML = "";
        saveAllTodo();
      }
    });
  
    const saveAllTodo = () => {
      const allTodos = [...document.querySelectorAll(".text-todo")].map(
        (task) => task.textContent
      );
      localStorage.setItem("allTodos", JSON.stringify(allTodos));
    };
  
    const loadAllTodo = () => {
      const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
      allTodos.forEach((task) => createTodo(task));
    };
  
    loadAllTodo();
  });
  