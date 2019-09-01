'use strict';

// EJERCICIO 4 MEJORAS

'use strict';

const taskStatus = document.querySelector('.app__title');
const taskList = document.querySelector('.tasks');

const tasks = [
  { name: "Recoger setas en el campo", completed: true },
  { name: "Comprar pilas", completed: true },
  { name: "Poner una lavadora de blancos", completed: true },
  {
    name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
    completed: false
  }
];

function updateTaskSummary() {
  // inicializa el objeto que usamos para el resumen
  const taskSummary = {
    total: tasks.length,
    completed: 0,
    pending: 0
  };

  // Ver tareas completadas
  for (const item of tasks) {
    if (item.completed === true) {
      taskSummary.completed++;
    }
  }

  // Calcula las pendientes
  taskSummary.pending = taskSummary.total - taskSummary.completed;

  // Escribe el resumen
  taskStatus.innerHTML = `Tienes ${taskSummary.total} tareas. ${taskSummary.completed} completadas y ${taskSummary.pending} por realizar`;
}

function addTasksListeners() {
  // Busco los nuevos checkbox
  const taskCheckboxes = document.querySelectorAll('.task__item');
  // Y aplico los listener
  for (const item of taskCheckboxes) {
    item.addEventListener('click', updateTaskStatus);
  }
}

function writeTasks() {
  // Genera todos los LI a partir del array en una variable
  let myTasks = '';
  for (let i = 0; i < tasks.length; i++) {
    let taskClass = 'task';
    let completedTask = '';
    if (tasks[i].completed === true) {
      taskClass = 'task task-completed';
      completedTask = 'checked';
    }

    myTasks += `
        <li class="${taskClass}">
          <label class="task__label" for="task-${i}">
            <input id="task-${i}" name="tasks" class="task__item" type="checkbox" data-index="${i}" ${completedTask}>
            ${tasks[i].name}
          </label>
        </li>
      `;
  }

  // Escribe los LIs
  taskList.innerHTML = myTasks;

  // Actualiza el resumen
  updateTaskSummary();

  // Aplica los listeners
  addTasksListeners();
}

function updateTaskStatus(event) {
  // Ver el estado final de la tarea
  const currentCheckbox = event.currentTarget;
  const taskIndex = parseInt(currentCheckbox.getAttribute('data-index'));
  const status = currentCheckbox.checked;

  // Actualizar el array de datos
  tasks[taskIndex].completed = status;

  // Volver a pintar
  writeTasks();
}

// Pinta la lista de tareas por primera vez
writeTasks();




