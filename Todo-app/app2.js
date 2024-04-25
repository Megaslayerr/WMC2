// 1. APPLICATION STATE
// - Holds the state of the application
// - This is the single source of truth for the application  state
const state = {
    todos: [
        { text: 'German', completed: false },
        { text: 'English', completed: true },
    ],
};

// 2. STATE ACCESSORS/MUTATORS FN'S
// - Functions that allow us to get and set the state
// - Here we will create functions to add and remove todos
function addTodo(text) {
    state.todos.push({ text, completed: false });
}

function removeTodo(index) {
    state.todos.splice(index, 1);
}

function toggleTodoCompleted(index) {
    state.todos[index].completed = !state.todos[index].completed;
}

// 3. DOM Node Refs
// - Static references to DOM nodes needed after the start of the application
const todoAdd$ = document.getElementById('todo-add');
const todoInput$ = document.querySelector('#todo-input');
const todoList$ = document.querySelector('#todo-list');
const todoFilter$ = document.querySelector('#todo-filter');

// 4. DOM Node Creation Fn's
// - Dynamic creation of DOM nodes needed upon user interaction
// - Here we will create a function that will create a todo item

// Version: document.createElement(..)
// function createTodoItem(todo) {
//   const todoItem = document.createElement("li");
//   todoItem.textContent = todo.text;
//   return todoItem;
// }

// Version: DOM Template Strings
function createTodoItem(todo) {
    return `
    <li>
      ${createTodoCheckBox(todo)}
      ${todo.text}
    </li>
    `;
}

function createTodoCheckBox(todo) {
    return `
    <input type="checkbox"
      ${todo.completed ? 'checked' : ''} onClick="console.log(event)">
    `;
}

// 5. RENDER FN
// - These functions will render the application state to the DOM
// - Here we will use a very naive but simple approach to re-render the list
// - IMPORTANT TAKEAWAY: The state drives the UI, any state change should trigger a re-render of the UI

// Version for: document.createElement(..)
// function render() {
//   todoList$.innerHTML = '';
//   for (let todo of state.todos) {
//     const todoItem = createTodoItem(todo);
//     todoList$.appendChild(todoItem);
//   }
// }

// Version for: DOM Template Strings
// function render() {
//   todoList$.innerHTML = '';
//   for (const todo of state.todos) {
//     todoList$.innerHTML += createTodoItem(todo);
//   }
// }

// Version for: DOM Template Strings
function render() {
    todoList$.innerHTML = state.todos.map(createTodoItem).join('\n');
}

// 6. EVENT HANDLERS
// - These functions handle user interaction e.g. button clicks, key presses etc.
// - These functions will call the state mutators and then call the render function
// - The naming convention for the event handlers is `on<Event>`
// - Here we will create a function that will handle the add button click
function onAddTodo() {
    const text = todoInput$.value;
    if (text.trim() !== '') {
        todoInput$.value = '';
        addTodo(text); // update state
        render(); // update ui
    }
}

function onRemoveTodo() {
    // update state
    // render
}

function onToggleTodoCompleted() {
    // update state
    // render
}

// 7. INIT BINDINGS
// - These are the initial bindings of the event handlers
todoAdd$.addEventListener('click', function (event) {
    onAddTodo();
});

todoInput$.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        onAddTodo();
    }
});

// 8. INITIAL RENDER
// - Here will call the render function to render the initial state of the application
render();
