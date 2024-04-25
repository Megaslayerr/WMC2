// 1. APPLICATION STATE
const state = {
    todos: [
        { text: 'German', completed: false },
        { text: 'English', completed: true },
    ],
};

// 2. STATE ACCESSORS/MUTATORS FN'S
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
const todoAdd$ = document.getElementById('todo-add');
const todoInput$ = document.querySelector('#todo-input');
const todoList$ = document.querySelector('#todo-list');
const todoFilter$ = document.querySelector('#todo-filter');

// 4. DOM Node Creation Fn's
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
function render() {
    todoList$.innerHTML = state.todos.map(createTodoItem).join('\n');
}

// 6. EVENT HANDLERS
function onAddTodo() {
    const text = todoInput$.value;
    if (text.trim() !== '') {
        todoInput$.value = '';
        addTodo(text);
        render();
    }
}

function onRemoveTodo(index) {
    removeTodo(index);
    render();
}

function onToggleTodoCompleted(index) {
    toggleTodoCompleted(index);
    render();
}

todoList$.addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === 'LI') {
        const index = Array.from(todoList$.children).indexOf(event.target);
        onRemoveTodo(index);
    }
});

todoList$.addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === 'INPUT' && event.target.type === 'checkbox') {
        const index = Array.from(todoList$.querySelectorAll('input[type="checkbox"]')).indexOf(event.target);
        onToggleTodoCompleted(index);
    }
});

todoAdd$.addEventListener('click', function (event) {
    onAddTodo();
});

todoInput$.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        onAddTodo();
    }
});

// 8. INITIAL RENDER
render();
