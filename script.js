const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    // Hoàn thành
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    // Xóa khi double-click
    li.addEventListener("dblclick", () => {
        li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = "";
});
