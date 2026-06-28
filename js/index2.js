const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("todo-button");
const todosContainer = document.getElementById("todos-container");
const filterSelect = document.getElementById("mySelect");
const searchInput = document.getElementById("searchInput");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const emptyState = document.getElementById("emptyState");

let allTodos = [];

/* ===========================
   Local Storage
=========================== */

const saveTodos = () => {
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
};

const loadTodos = () => {
    const storedTodos = localStorage.getItem("allTodos");

    if (storedTodos) {
        allTodos = JSON.parse(storedTodos);
    }

    renderTodos(allTodos);
};


/* ===========================
   Add Todo
=========================== */

const addTodo = () => {
    const value = taskInput.value.trim();

    if (!value) return;

    const task = {
        id: crypto.randomUUID(),
        taskDetails: value,
        isCompleted: false,
        createdAt: new Date().toLocaleDateString(),
    };

    allTodos.unshift(task);

    saveTodos();

    renderTodos(allTodos);

    taskInput.value = "";
};

addBtn.addEventListener("click", addTodo);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

/* ===========================
   Statistics
=========================== */

const updateStatistics = () => {
    totalTasks.textContent = allTodos.length;

    completedTasks.textContent = allTodos.filter(
        (todo) => todo.isCompleted
    ).length;

    pendingTasks.textContent = allTodos.filter(
        (todo) => !todo.isCompleted
    ).length;
};

/* ===========================
   Empty State
=========================== */

const toggleEmptyState = () => {
    emptyState.classList.toggle("d-none", allTodos.length !== 0);
};

/* ===========================
   Render Todos
=========================== */

const renderTodos = (todos) => {

    todosContainer.innerHTML = "";

    todos.forEach(task => {

        todosContainer.innerHTML += `
        <div class="col-12 todo ${task.isCompleted ? "completed" : ""}">

            <div class="todo-item d-flex justify-content-between align-items-center">

                <div class="todo-title">
                    ${task.taskDetails}
                </div>

                <div class="todo-actions">

                    <button
                        class="action-btn complete-btn"
                        onclick="toggleComplete('${task.id}')">

                        <i class="fa-solid fa-check"></i>

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteTodo('${task.id}')">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>
        `;

    });

    updateStatistics();

    toggleEmptyState();

};
const toggleComplete = (id) => {

    const todo = allTodos.find(todo => todo.id === id);

    if (!todo) return;

    todo.isCompleted = !todo.isCompleted;

    saveTodos();

    renderTodos(allTodos);

};
const deleteTodo = (id) => {

    allTodos = allTodos.filter(todo => todo.id !== id);

    saveTodos();

    renderTodos(allTodos);


};

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();

    const filteredTodos = allTodos.filter(todo =>
        todo.taskDetails.toLowerCase().includes(value)
    );

    renderTodos(filteredTodos);
});
filterSelect.addEventListener("change", () => {

    switch (filterSelect.value) {

        case "all":
            renderTodos(allTodos);
            break;

        case "completed":
            renderTodos(
                allTodos.filter(todo => todo.isCompleted)
            );
            break;

        case "uncompleted":
            renderTodos(
                allTodos.filter(todo => !todo.isCompleted)
            );
            break;

    }

});
loadTodos();