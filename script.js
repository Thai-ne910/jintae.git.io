const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("priority");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    const filtered = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <strong>${task.text}</strong> - <em>${task.priority}</em>
            <div class="meta">Ngày tạo: ${task.date}</div>
        `;

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks(filter);
        });

        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            if (confirm("Xóa nhiệm vụ này?")) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(filter);
            }
        });

        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    const date = new Date().toLocaleDateString("vi-VN");

    if (!text) return;

    tasks.push({
        text,
        priority,
        completed: false,
        date
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
});

// Filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        renderTasks(btn.dataset.filter);
    });
});

// Initial render
renderTasks();
