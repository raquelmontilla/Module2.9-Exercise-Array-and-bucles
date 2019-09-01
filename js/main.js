'use strict';

// EJERCICIO 4 REPASO

const tasksList = document.querySelector('.js-list');
const tasksStatus = document.querySelector('.status');



// Array de objetos con dos propiedades: name y completed
const tasks = [
  { name: "Recoger setas en el campo", completed: true },
  { name: "Comprar pilas", completed: true },
  { name: "Poner una lavadora de blancos", completed: true },
  {
    name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
    completed: false
  }
];

const taskSumary = {
  total: tasks.length,
  completed: 0,
  pending: 0,
};

for (const item of tasks) {
  if (item.completed === true) {
    taskSumary.completed++;
  }
}


// Mostrar una frase que indique cuántas tareas hay.
// const numberTask = () => {
//   console.log(`En esta lista hay ${tasks.length} tareas.`)
// }
// numberTask()

// Pintar todas las tareas en consola.
// const consolePaintTask = () => {
//   for (let i = 0; i < tasks.length; i++) {
//     console.log(tasks[i].name);
//   }
// };
// consolePaintTask()



// #Fase 1: Pintar todas las tareas en pantalla.
const paintTask = () => {
  // 1. Crear una variable vacia donde guardar el resultado.
  let myTasks = '';
  // 2. Recorrer el array.
  for (let i = 0; i < tasks.length; i++) {
    // 3. Si la tarea está completada, la pintamos tachada.
    // [x]1. Pintar las tareas con los checkbox.
    if (tasks[i].completed === true) {
      myTasks += `
        <li class="tasks completed">
          <label class="taskLabel" for="task-${i}">
            <input id="task-${i}" name="task" class="taskCheckbox" type="checkbox" checked>
            ${tasks[i].name}
          </label>
        </li>`;
    } else {
      // 4. Si la tarea no está completada, la pintamos sin tachar.
      myTasks += `
        <li class="tasks">
          <label class="taskLabel" for="task-${i}">
            <input id="task-${i}" name="task" class="taskCheckbox" type="checkbox">
            ${tasks[i].name}
          </label>
        </li>`;
    }

  }
  //Modificar el listado por la variable creada.
  tasksList.innerHTML = myTasks;

  // 1. Busco los checkboxes clickados
  const taskCheckboxes = document.querySelectorAll('.taskCheckbox')

  //2. Los recorro para leerlos y aplicarle un listener
  for (const checkbox of taskCheckboxes) {
    checkbox.addEventListener('click', updateTaskStatus)
  }
}

// 2. Hacer que al clickar en un checkbox, pasen dos cosas:
function updateTaskStatus(event) {
  // Creo una variable para saber el elemento que ha sido clickado
  const currentCheckbox = event.currentTarget;
  //Esta variable es la nieta del listado. La nieta:currentCheckbox. La madre:label. La abuela:listado
  const currentTaskCheckbox = currentCheckbox.parentElement.parentElement;

  if (currentCheckbox.checked === true) {
    // 2.1. Si queda marcado -> que se vea tachado.
    currentTaskCheckbox.classList.add('completed');
    //Actualizar el estado
    taskSumary.completed++;
    taskSumary.pending = taskSumary.total - taskSumary.completed;
    //3.1. Cuando pinto las tareas tengo que indicar (Tienes X tareas, Y completadas y Z por realizar)
    tasksStatus.innerHTML = `Tienes ${taskSumary.total} tareas, ${taskSumary.completed} completadas y ${taskSumary.pending} por realizar.`;
  } else {
    // 2.2. Si queda desmarcado -> que se vea sin tachar.
    currentTaskCheckbox.classList.remove('completed');
    //Actualizar el estado
    taskSumary.completed--;
    taskSumary.pending = taskSumary.total - taskSumary.completed;
    //3.1. Cuando pinto las tareas tengo que indicar (Tienes X tareas, Y completadas y Z por realizar)
    tasksStatus.innerHTML = `Tienes ${taskSumary.total} tareas, ${taskSumary.completed} completadas y ${taskSumary.pending} por realizar.`;
  };
}

//Ejecutar la función.
paintTask();

// #Fase 3: Resumen de las tareas

// 3.2.Cuando cambio alguna Tarea tengo que actualizar el PerformanceResourceTiming.



