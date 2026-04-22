let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const date = document.getElementById("taskDate").value;

  if (text === "") return;

  tasks.push({ text, date, completed: false });
  saveTasks();
  renderTasks();

  document.getElementById("taskInput").value = "";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">
        ${task.text} <br>
        <small>${task.date || ""}</small>
      </span>
      <br>
      <button onclick="toggleComplete(${index})">✔</button>
      <button onclick="editTask(${index})">✏</button>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
