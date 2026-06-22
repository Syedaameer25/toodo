let tasks = [];

/* ✅ Add Task */
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (!text) {
        alert("Please enter a task");
        return;
    }

    tasks.push({ text: text, done: false });
    input.value = '';

    saveTasks();
    renderTasks();
}

/* ✅ Toggle Task */
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

/* ✅ Edit Task */
function editTask(index) {
    const updatedText = prompt("Edit your task:", tasks[index].text);

    if (updatedText === null) return;

    const text = updatedText.trim();

    if (!text) {
        alert("Task cannot be empty");
        return;
    }

    tasks[index].text = text;

    saveTasks();
    renderTasks();
}

/* ✅ Delete Task */
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

/* ✅ Render Tasks with Filter */
function renderTasks(filter = 'all') {
    const list = document.getElementById('taskList');

    list.innerHTML = tasks
        .filter(t => filter === 'all' || (filter === 'completed' ? t.done : !t.done))
        .map((task, i) => `
            <li class="${task.done ? 'completed' : ''}">
                <input type="checkbox"
                       ${task.done ? 'checked' : ''}
                       onchange="toggleTask(${i})">

                <span>${task.text}</span>

                <div class="actions">
                    <button class="edit-btn" onclick="editTask(${i})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${i})">Delete</button>
                </div>
            </li>
        `)
        .join('');
}

/* ✅ Filter Function */
function filterTasks(filter) {
    renderTasks(filter);
}

/* ✅ Save to LocalStorage */
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* ✅ Load from LocalStorage */
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

/* ✅ Enter Key Support */
document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

/* ✅ Initial Load */
loadTasks();
renderTasks();