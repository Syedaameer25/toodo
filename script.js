// Global Variables
let tasks = [];
let currentFilter = "all";

// Add Task
function addTask() {

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: text,
        done: false
    });

    input.value = "";

    saveTasks();
    renderTasks(currentFilter);
}

// Toggle Task
function toggleTask(index) {

    tasks[index].done = !tasks[index].done;

    saveTasks();
    renderTasks(currentFilter);
}

// Edit Task
function editTask(index) {

    const updatedText = prompt("Edit Task", tasks[index].text);

    if (updatedText === null) return;

    const text = updatedText.trim();

    if (!text) {
        alert("Task cannot be empty");
        return;
    }

    tasks[index].text = text;

    saveTasks();
    renderTasks(currentFilter);
}

// Delete Task
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks(currentFilter);
}

// Render Tasks
function renderTasks(filter = "all") {

    currentFilter = filter;

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks
        .filter(task => {
            if (filter === "all") return true;
            if (filter === "completed") return task.done;
            return !task.done;
        })

        .forEach((task, index) => {

            const li = document.createElement("li");

            if (task.done) {
                li.classList.add("completed");
            }

            li.innerHTML = `
                <input
                    type="checkbox"
                    class="task-checkbox"
                    data-index="${index}"
                    ${task.done ? "checked" : ""}
                >

                <span>${task.text}</span>

                <div class="actions">
                    <button class="edit-btn" data-index="${index}">
                        Edit
                    </button>

                    <button class="delete-btn" data-index="${index}">
                        Delete
                    </button>
                </div>
            `;

            list.appendChild(li);

        });

}

// Filter
function filterTasks(filter) {

    currentFilter = filter;

    renderTasks(filter);

}

// Save Local Storage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Load Local Storage
function loadTasks() {

    const saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
    }

}

// =======================
// Event Listeners
// =======================

// Add Button
document.getElementById("addBtn").addEventListener("click", addTask);

// Enter Key
document.getElementById("taskInput").addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Filter Buttons
document.getElementById("allBtn").addEventListener("click", function () {
    filterTasks("all");
});

document.getElementById("completedBtn").addEventListener("click", function () {
    filterTasks("completed");
});

document.getElementById("pendingBtn").addEventListener("click", function () {
    filterTasks("pending");
});

// Event Delegation
document.getElementById("taskList").addEventListener("click", function (event) {

    const index = event.target.dataset.index;

    if (event.target.classList.contains("task-checkbox")) {
        toggleTask(index);
    }

    if (event.target.classList.contains("edit-btn")) {
        editTask(index);
    }

    if (event.target.classList.contains("delete-btn")) {
        deleteTask(index);
    }

});

// Initial Load
loadTasks();
renderTasks();