document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskStart = document.getElementById('task-start');
  const workingTasks = document.getElementById('working-tasks');
  const completedTasks = document.getElementById('completed-tasks');
  const searchInput = document.getElementById('search-input');

  // Функция для сохранения задач в локальное хранилище
  function saveTasks() {
    localStorage.setItem('workingTasks', workingTasks.innerHTML);
    localStorage.setItem('completedTasks', completedTasks.innerHTML);
  }

  // Функция для загрузки задач из локального хранилища
  function loadTasks() {
    if (localStorage.getItem('workingTasks')) {
      workingTasks.innerHTML = localStorage.getItem('workingTasks');
    }
    if (localStorage.getItem('completedTasks')) {
      completedTasks.innerHTML = localStorage.getItem('completedTasks');
    }
  }

  // Функция для фильтрации задач
  function filterTasks(searchText) {
    const tasks = workingTasks.getElementsByTagName('li');
    for (let task of tasks) {
      const taskText = task.textContent.toLowerCase();
      if (taskText.includes(searchText.toLowerCase())) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  }

  // Обработчик события input для поля ввода поиска
  searchInput.addEventListener('input', function() {
    filterTasks(searchInput.value.trim());
  });

  // Загрузка задач при загрузке страницы
  loadTasks();

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const taskStartDate = new Date(taskStart.value.trim()); // Получаем дату начала задачи
    if (taskText !== '' && !isNaN(taskStartDate.getTime())) {
      const taskStartValue = taskStartDate.toLocaleDateString() + ' ' + taskStartDate.toLocaleTimeString(); // Форматируем дату и время начала задачи
      const newTask = document.createElement('li');
      newTask.textContent = taskText + ' (начало: ' + taskStartValue + ')';
      newTask.classList.add('task-item'); // Добавляем класс task-item
      workingTasks.appendChild(newTask);
      taskInput.value = '';
      taskStart.value = '';

      // Обработчик клика по задаче
      newTask.addEventListener('click', function() {
        const confirmDelete = confirm('Вы уверены, что хотите завершить эту задачу?');
        if (confirmDelete) {
          const currentDate = new Date();
          const taskEndDate = currentDate.toLocaleDateString(); // Получаем текущую дату
          newTask.textContent += ' (конец: ' + taskEndDate + ')';
          completedTasks.appendChild(newTask);
          saveTasks();
        }
      });
      saveTasks();
    } else {
      console.log('Введите задачу и выберите корректную дату начала!');
    }
  });
});