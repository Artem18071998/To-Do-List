document.addEventListener('DOMContentLoaded', function() {
  const taskList = document.getElementById('task-list');
  const workingTasks = document.getElementById('working-tasks');
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
  function createTask(taskText, taskStartValue) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
      <span class="timer">00:00:00</span>
      <button class="delete-btn">Удалить</button>
    `;
    return taskItem;
  }

  // Функция для обновления счетчика времени
  function updateTimer() {
    const workingTasksItems = workingTasks.getElementsByClassName('task-item');
    Array.from(workingTasksItems).forEach(function(taskItem) {
      const timeElement = taskItem.querySelector('.timer');
      if (timeElement) {
        const startDate = new Date(timeElement.dataset.start);
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startDate) / 1000); // Прошедшее время в секундах
        timeElement.textContent = formatTime(elapsedTime);
      }
    });
  }

  // Функция для форматирования времени в формат hh:mm:ss
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  
   // Обработчик отправки формы
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  const taskStartValue = taskStart.value.trim();
  const isValidTime = /^([01]\d|2[0-3]):([0-5]\d)$/.test(taskStartValue);
  if (taskText !== '' && isValidTime) {
    const newTask = createTask(taskText);
    // Добавляем начальное время задачи в список "Задачи в работе"
    const startTimeSpan = document.createElement('span');
    startTimeSpan.textContent = `Начало: ${taskStartValue}`;
    newTask.appendChild(startTimeSpan);
    // Добавляем задачу в список "Задачи в работе"
    workingTasks.appendChild(newTask);
    taskInput.value = '';
    taskStart.value = '';
    // Добавляем счетчик времени для новой задачи
    const timerSpan = document.createElement('span');
    timerSpan.classList.add('timer');
    timerSpan.dataset.start = new Date().toISOString();
    timerSpan.textContent = '00:00:00';
    newTask.appendChild(timerSpan);
    // Запускаем счетчик времени для новой задачи
    startTimer(timerSpan);
  } else {
    alert('Введите корректное время начала задачи в формате HH:MM (например, 09:30).');
  }
});

  // Функция запуска счетчика времени
function startTimer(timerSpan) {
  const startTime = new Date(timerSpan.dataset.start).getTime();
  function updateTimer() {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - startTime;
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    timerSpan.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  // Обновляем счетчик времени каждую секунду
  setInterval(updateTimer, 1000);
}
  
  // Обработчик удаления задачи и перемещения в "Выполненные"
workingTasks.addEventListener('click', function(event) {
  const taskItem = event.target.closest('.task-item');
  if (event.target.classList.contains('delete-btn')) {
    taskItem.remove();
  } else if (event.target.type === 'checkbox') {
    if (event.target.checked) {
      const completedTask = taskItem.cloneNode(true);
      taskItem.remove();
      // Удаление счетчика времени при завершении задачи
      completedTask.querySelector('.timer').remove();
      // Добавление окончательного времени задачи в список "Выполненные задачи"
      const currentDate = new Date();
      const endTimeSpan = document.createElement('span');
      endTimeSpan.textContent = `Окончание: ${currentDate.toLocaleString()}`;
      completedTask.appendChild(endTimeSpan);
      // Добавляем задачу в список "Выполненные задачи"
      completedTasks.appendChild(completedTask);
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
    const tasks = workingTasks.getElementsByClassName('task-item');
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