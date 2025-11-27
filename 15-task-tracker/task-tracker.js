const $button = document.querySelector('.task-button')
const $template = document.getElementById('template-task')
const $fragment = document.createDocumentFragment()
const $tasksContainer = document.querySelector(".task-section");

let tasks = []


$button.addEventListener('click', () => {submitHandler()})

function submitHandler() {
   createNewTask();
}

function renderTasks(){

  var reRerenderedTasks = document.createDocumentFragment()
  tasks.sort(sortTasks)

  tasks.forEach(task => {
    //We have to store the taskSeparator because we need to append it after the taks! But if we append it before the tasks doesn't exist
    const taskSeparator = task.node.nextElementSibling
    reRerenderedTasks.appendChild(task.node)
   if(taskSeparator) reRerenderedTasks.appendChild(taskSeparator)

  });
  $tasksContainer.appendChild(reRerenderedTasks)
}


function completeTaks(event){
   
  const $target = event.target;
  const completedTask = tasks.find((task) => task.node === event.target.parentElement)
  if(completedTask.completed) {
      $target.classList.remove('completed')
      completedTask.node.classList.remove('task-completed')
      completedTask.completed  = false
  } else {
      completedTask.completed = true

      $target.classList.add('completed')
      completedTask.node.classList.add('task-completed')
  }
  renderTasks()

}

function createNewTask(){
    //We get the text from the input
    const textInfo = document.querySelector('.task-input').value

    //We get the template to duplicate
    const template = document.getElementById("template-task");

    //We clone the template
    const clone = template.content.cloneNode(true);

    const $newTask = clone.querySelector('div')

    //Change the value for the text from the input
    $newTask.querySelector('.task-info').innerHTML = textInfo

    //Add the remove Task when task-remove is clicked
    $newTask.querySelector('.task-remove').addEventListener('click', (event) => {removeTask(event)})
    
    $newTask.querySelector('.task-status').addEventListener('click', (event) => {completeTaks(event)})
    tasks.unshift({node: $newTask, completed: false})
    
    renderTasks()
}

function removeTask(event){
  const index = tasks.findIndex(t => t.node === event.target.parentElement);
  const node = tasks[index].node;

  node.nextElementSibling?.remove();  
  node.remove();                       

  tasks.splice(index, 1);          
  renderTasks();
}

function sortTasks(a, b){
  return Number(a.completed) - Number(b.completed);
}