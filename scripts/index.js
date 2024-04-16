document.addEventListener('DOMContentLoaded', function() {
  const taskList = document.getElementById('task-list');
  const completedTasks = document.getElementById('completed-tasks');
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskStart = document.getElementById('task-start');
  const taskEnd = document.getElementById('task-end');
  const searchInput = document.getElementById('search-input');
  const addBtn = document.getElementById('add-btn');
  
  // Звуковой эффект при нажатии на кнопку "Добавить"
  addBtn.addEventListener('click', function() {
    const addSound = document.getElementById('add-sound');
    addSound.play();
  });

  // Функция для создания новой задачи
  function createTask(taskText, taskStartValue, taskEndValue) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
      <span>Начало: ${taskStartValue}<br>Окончание: ${taskEndValue}</span>
      <button class="delete-btn">Удалить</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Обработчик отправки формы
  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const taskStartValue = taskStart.value;
    const currentDate = new Date();
    const taskEndValue = currentDate.toISOString().slice(0,16);
    if (taskText !== '') {
      createTask(taskText, taskStartValue, taskEndValue);
      taskInput.value = '';
      taskStart.value = '';
      taskEnd.value = '';
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