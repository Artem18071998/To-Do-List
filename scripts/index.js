document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    
    // Функция для создания новой задачи
    function createTask(taskText) {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="delete-btn">Удалить</button>
      `;
      taskList.appendChild(taskItem);
    }
    
    // Обработчик отправки формы
    taskForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        createTask(taskText);
        taskInput.value = '';
      }
    });
    
    // Обработчик удаления задачи
    taskList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-btn')) {
        event.target.closest('.task-item').remove();
      }
    });
  });