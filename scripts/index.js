document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskStart = document.getElementById('task-start');
  const workingTasks = document.getElementById('working-tasks');
  const completedTasks = document.getElementById('completed-tasks');

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const taskStartValue = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    if (taskText !== '') {
      const newTask = document.createElement('li');
      newTask.textContent = taskText;
      newTask.classList.add('task-item'); // Добавляем класс task-item
      workingTasks.appendChild(newTask);
      taskInput.value = '';
      taskStart.value = '';

      const startTimeSpan = document.createElement('span');
      startTimeSpan.textContent = ' (начало: ' + taskStartValue + ')';
      newTask.appendChild(startTimeSpan);

      // Обработчик клика по задаче
      newTask.addEventListener('click', function() {
        const confirmDelete = confirm('Вы уверены, что хотите завершить эту задачу?');
        if (confirmDelete) {
          const taskEndTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
          newTask.textContent += ' (конец: ' + taskEndTime + ')';
          completedTasks.appendChild(newTask);
        }
      });
    } else {
      console.log('Введите задачу!');
    }
  });
});