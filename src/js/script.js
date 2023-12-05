//Seleção de elementos

const blobImg = document.getElementById('blob');

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");

const searchAndFilter = document.querySelector("#toolbar");

const cancelEditBtn = document.querySelector(".cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");


let oldInputValue;

// Funções

const saveTodo = (text, done = 0 , save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("add-todo");
    doneBtn.innerHTML= '<i class="fa-solid fa-check"</i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML= '<i class="fa-solid fa-trash"></i>';
    todo.appendChild(deleteBtn);

    // UTILIZANDO DADOS DA LS

    if(done) {
        todo.classList.add("done");        
        saveTodoLocalStorage({text: todo.textContent, done: true })
    }


    //  --------------------------------------

    todoList.appendChild(todo);

    todoInput.value = "";
    // todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
    searchAndFilter.classList.toggle("hide");
}

// EDITAR

const uptadeTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
           
    todos.forEach((todo)=> {
         let todoTitle = todo.querySelector("h3");

         if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

        uptadeTextLocalStorage(oldInputValue, text);
    }
})
};

// PROCURAR

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
           
    todos.forEach((todo)=> {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = "flex"

        console.log(todoTitle)

        if(!todoTitle.includes(search)) {
            todo.style.display ="none"
    }
})}

// FILTRAR 

const filterTodos = (filterValue => {
    const todos = document.querySelectorAll(".todo");

    switch(filterValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;

        case "done":
            todos.forEach((todo) => 
            todo.classList.contains("done") 
            ? (todo.style.display = "flex") 
            : (todo.style.display = "none"));
            break;

        case "todo":
            todos.forEach((todo) => 
            !todo.classList.contains("done") 
            ? (todo.style.display = "flex") 
            : (todo.style.display = "none"));
            break;

        default: break;
    }
})

// Eventos

// ADICIONAR

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }

    blobImg.style.transform = "scale(1.8)"
    blobImg.style.transition = "4s"
    blobImg.style.marginTop = "200px" 
});

document.addEventListener("click", (e)=> {
    const targerEl = e.target;
    const parentEl = targerEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
         todoTitle = parentEl.querySelector("h3").innerText || "";
    }

    if (targerEl.classList.contains("add-todo")) {
        parentEl.classList.toggle("done");

        uptadeTodoStatusLocalStorage(todoTitle);
    }

    if(targerEl.classList.contains("remove-todo")) {
        parentEl.remove();

        removeTodosLocalStorage(todoTitle);
    }

    if(targerEl.classList.contains("edit-todo")) {
     toggleForms();
     
     editInput.value = todoTitle;
     oldInputValue = todoTitle;
    }
});

// BOTÃO LIMPAR/CANCELAR

cancelEditBtn.addEventListener("click",(e)=> {
    e.preventDefault()

    toggleForms();
});

// BOTÃO EDIT

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value;

    if(editInputValue) {
        uptadeTodo(editInputValue);
    }

    toggleForms();
    console.log('depois de editar')
})

// // BOTÃO PESQUISA

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value

    getSearchTodos(search);
})

// BOTÃO LIMPAR PESQUISA

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});


// LOCAL STORAGE

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    // Todos toDos da Ls
    const todos = getTodosLocalStorage()
    // add novo todo no arr
    todos.push(todo);
    //salvar tudo na Ls
    localStorage.setItem("todos", JSON.stringify(todos))
};

// REMOVER DA LS

const removeTodosLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText)

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

// SALVAR OS QUE ESTÃO FEITOS

const uptadeTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) => 
    todo.text === todoText 
    ? (todo.done = !todo.done) 
    : null);

    localStorage.setItem("todos", JSON.stringify(todos));
}

// UPTADE DO TEXTO QUANDO EDITA

const uptadeTextLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) => 
    todo.text === todoOldText 
    ? (todo.text = todoNewText) 
    : null);

    localStorage.setItem("todos", JSON.stringify(todos));
}

loadTodos()
