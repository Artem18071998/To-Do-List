document.addEventListener('DOMContentLoaded', function() {
  const taskList = document.getElementById('task-list');
  const completedTasks = document.getElementById('completed-tasks');
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const searchInput = document.getElementById('search-input');
  
  // Функция для создания новой задачи
  function createTask(taskText, taskDate) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
      <span>${taskDate}</span>
      <button class="delete-btn">Удалить</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Обработчик отправки формы
  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;
    if (taskText !== '') {
      createTask(taskText, taskDateValue);
      taskInput.value = '';
      taskDate.value = '';
    }
  });
  
  // Обработчик удаления задачи и перемещения в "Выполненные"
  taskList.addEventListener('click', function(event) {
    const taskItem = event.target.closest('.task-item');
    if (event.target.classList.contains('delete-btn')) {
      taskItem.remove();
    } else if (event.target.type === 'checkbox') {
      if (event.target.checked) {
        taskItem.classList.add('completed');
        completedTasks.appendChild(taskItem);
      } else {
        taskItem.classList.remove('completed');
        taskList.appendChild(taskItem);
      }
    }
  });

  // Обработчик удаления задачи из "Выполненные"
  completedTasks.addEventListener('click', function(event) {
    const taskItem = event.target.closest('.task-item');
    if (event.target.classList.contains('delete-btn')) {
      taskItem.remove();
    }
  });
  
  // Обработчик поиска задач
  searchInput.addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const tasks = taskList.getElementsByClassName('task-item');
    Array.from(tasks).forEach(function(task) {
      const text = task.getElementsByTagName('span')[0].textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        task.style.display = 'flex';
      } else {
        task.style.display = 'none';
      }
    });
  });
});