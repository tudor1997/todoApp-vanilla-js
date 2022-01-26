const form = document.querySelector('.form-container');
const container = document.querySelector('.container');
const input = document.querySelector('.add');
const title = document.querySelector('.app-title')

const todos = JSON.parse(localStorage.getItem("todos"));


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(input.value !== ""){
        addItem(input.value);
        input.value = "";
    }
    
});

const updateLS = () => {
    const todos = document.querySelectorAll('.elem input');

    const todosElements = [];
    
    todos.forEach(todo => todosElements.push(todo.value));

    localStorage.setItem('todos', JSON.stringify(todosElements));
}

const addItem = (text="") => {
    const todoEl = document.createElement('div');
    todoEl.classList.add('elem');
    todoEl.innerHTML = `
        <input class="todoValue isDisable" type="text" autofocus>
        <div class="buttons">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
    `
    const deleteBtn = todoEl.querySelector('.delete');
    const editBtn = todoEl.querySelector('.edit');
    const todoValue = todoEl.querySelector('.todoValue');
   
    todoValue.value = text
    
    deleteBtn.addEventListener('click', () => {
        todoEl.remove();
        updateLS();
    });
   
    editBtn.addEventListener('click', (e) =>  {
        todoValue.classList.toggle("isDisable");
        todoValue.focus();
    });
    todoValue.addEventListener('input', (e) => {
        const {value} = e.target;
        todoValue.value = value;
        todoValue.classList.add("isDisable");
        updateLS();
    })
    container.appendChild(todoEl);
    updateLS();
}
if(todos) {
    todos.forEach(todo => {
        addItem(todo);
    })
}

const titleApp = "Todo List"

title.innerHTML = titleApp.split("").map((letter,index) => {
   return  `<span style="animation-delay:${index * 80}ms">${letter}</span>`
}).join("")
