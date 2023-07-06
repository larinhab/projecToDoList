//Seleção de elementos

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#todo-form")

let oldInputValue;

// Funções
const saveTodo = (text, done=0, save=1) => {
    const todo = document.createElement("div");
    todo.classList.add ("todo");

    const todoTitle = document.childElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML= '<i class="fa solid fa check"</i>';
    todo. appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML= '<i class="fa solid fa pen"</i>';
    todo. appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("finish-todo");
    deleteBtn.innerHTML= '<i class="fa solid fa xmark"</i>';
    todo. appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const uptadeTodo = (text) => {

    const todos = document.querySelectorAll(".todo")
todos.ForEach((todo)=>{
    let todoTitle = todo.querySelector("h3")

    if(todoTitle.innerText === oldInputValue) {
        todoTitle.innerText = text;
    }
})

}
// Eventos

todoForm.addEventListener("submit", (e) => {
    e. preventDefault ();

    const InputValue = todoInput.Value;

    if(InputValue) {
        saveTodo(InputValue);
    }

});

document.addEventListener("click", (e)=> {
    const targerEl = e.target;
    const parentEl = targerEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        let todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targerEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if(targerEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if(targerEl.classList.contains("edit-todo")) {
     toggleForms();
     
     editInput.value = todoTitle;
     oldInputValue = todoTitle;
    }
});
    cancelEditBtn.addEventListener("click",(e)=> {
        e.preventDefault()

        toggleForms ();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const editInputValue = editInput.value

    if (editInputValue) {
        uptadeTodo(editInputValue)
    }

    toggleForms()
})